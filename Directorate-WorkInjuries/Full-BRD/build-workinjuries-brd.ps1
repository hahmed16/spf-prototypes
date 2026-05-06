Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$baseDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$mdPath = Join-Path $baseDir 'docs\MeetingNote.md'
$htmlPath = Join-Path $baseDir 'Directorate-WorkInjuries-Full-BRD.html'

$raw = Get-Content -Raw -Encoding utf8 $mdPath

function Get-Span {
    param(
        [string]$Start,
        [string]$End
    )

    $startIndex = $raw.IndexOf($Start)
    if ($startIndex -lt 0) {
        throw "Start marker not found: $Start"
    }

    if ([string]::IsNullOrWhiteSpace($End)) {
        return $raw.Substring($startIndex).Trim()
    }

    $endIndex = $raw.IndexOf($End, $startIndex)
    if ($endIndex -lt 0) {
        throw "End marker not found for start marker: $Start"
    }

    return $raw.Substring($startIndex, $endIndex - $startIndex).Trim()
}

function Get-FromStart {
    param([string]$End)

    $endIndex = $raw.IndexOf($End)
    if ($endIndex -lt 0) {
        throw "End marker not found: $End"
    }

    return $raw.Substring(0, $endIndex).Trim()
}

function Convert-InlineText {
    param([string]$Text)

    $encoded = [System.Net.WebUtility]::HtmlEncode($Text.Trim())
    $encoded = [regex]::Replace($encoded, '`([^`]+)`', '<code>$1</code>')
    $encoded = [regex]::Replace($encoded, '\*\*([^*]+)\*\*', '<strong>$1</strong>')
    $encoded = [regex]::Replace($encoded, '_([^_]+)_', '<em>$1</em>')
    return $encoded
}

function Test-ListLine {
    param([string]$Line)

    $trimmed = $Line.TrimEnd()
    return $trimmed -match '^(\s*)([-•])\s+(.+)$' -or $trimmed -match '^(\s*)(\d+)\\?\.\s+(.+)$'
}

function Parse-ListItem {
    param([string]$Line)

    $trimmed = $Line.TrimEnd()
    if ($trimmed -match '^(\s*)([-•])\s+(.+)$') {
        return [pscustomobject]@{
            Indent = $matches[1].Length
            Type   = 'ul'
            Text   = $matches[3]
        }
    }

    if ($trimmed -match '^(\s*)(\d+)\\?\.\s+(.+)$') {
        return [pscustomobject]@{
            Indent = $matches[1].Length
            Type   = 'ol'
            Text   = $matches[3]
        }
    }

    throw "Not a list line: $Line"
}

function Render-List {
    param(
        [object[]]$Items,
        [int]$StartIndex,
        [int]$Indent,
        [string]$Type
    )

    $tag = if ($Type -eq 'ol') { 'ol' } else { 'ul' }
    $sb = [System.Text.StringBuilder]::new()
    [void]$sb.AppendLine("<$tag>")

    $i = $StartIndex
    while ($i -lt $Items.Count) {
        $item = $Items[$i]
        if ($item.Indent -lt $Indent) { break }
        if ($item.Indent -gt $Indent) { break }
        if ($item.Type -ne $Type) { break }

        [void]$sb.Append("<li>")
        [void]$sb.Append((Convert-InlineText $item.Text))
        $i++

        while ($i -lt $Items.Count -and $Items[$i].Indent -gt $Indent) {
            $nested = Render-List -Items $Items -StartIndex $i -Indent $Items[$i].Indent -Type $Items[$i].Type
            [void]$sb.Append($nested.Html)
            $i = $nested.NextIndex
        }

        [void]$sb.AppendLine("</li>")
    }

    [void]$sb.AppendLine("</$tag>")
    return @{
        Html      = $sb.ToString()
        NextIndex = $i
    }
}

function Convert-MarkdownTable {
    param([string[]]$Rows)

    $dataRows = @()
    foreach ($row in $Rows) {
        $tableSignature = (($row.Trim() -replace '\|', '') -replace '\s', '')
        if ($tableSignature -and $tableSignature -match '^[-:]+$') {
            continue
        }

        $cells = $row.Trim().Trim('|').Split('|') | ForEach-Object { (Convert-InlineText $_) }
        $dataRows += ,$cells
    }

    if ($dataRows.Count -eq 0) {
        return ''
    }

    $sb = [System.Text.StringBuilder]::new()
    [void]$sb.AppendLine('<table>')
    [void]$sb.AppendLine('<thead><tr>')
    foreach ($cell in $dataRows[0]) {
        [void]$sb.AppendLine("<th>$cell</th>")
    }
    [void]$sb.AppendLine('</tr></thead>')

    if ($dataRows.Count -gt 1) {
        [void]$sb.AppendLine('<tbody>')
        for ($r = 1; $r -lt $dataRows.Count; $r++) {
            [void]$sb.AppendLine('<tr>')
            foreach ($cell in $dataRows[$r]) {
                [void]$sb.AppendLine("<td>$cell</td>")
            }
            [void]$sb.AppendLine('</tr>')
        }
        [void]$sb.AppendLine('</tbody>')
    }

    [void]$sb.AppendLine('</table>')
    return $sb.ToString()
}

function Get-HeadingTag {
    param([string]$Line)

    $trimmed = $Line.Trim()

    if ($trimmed -match '^#{1,6}\s+') {
        switch -Regex ($trimmed) {
            '^#\s+'     { return 'h3' }
            '^##\s+'    { return 'h4' }
            default     { return 'h5' }
        }
    }
    if ($trimmed -match '^(الملخص التنفيذي|نطاق الوثيقة|أبرز ما تتضمنه الوثيقة|سجل التغييرات)$') { return 'h3' }
    if ($trimmed -match '^(أولاً|ثانياً|ثالثاً|رابعاً|خامساً|سادساً|سابعاً|ثامناً|تاسعاً|عاشراً|الحادي عشر|الثاني عشر|الثالث عشر|الرابع عشر|الخامس عشر)\s*:') { return 'h3' }
    if ($trimmed -match '^ملحق رقم \d+') { return 'h3' }
    if ($trimmed -match '^\d+\.\d+(\.\d+)?\s+') { return 'h4' }
    if ($trimmed -match '^الإجراء\s+\S+') { return 'h4' }
    if ($trimmed -match '^المرحلة\s+') { return 'h5' }
    if ($trimmed -match '^قرارات .+:$') { return 'h5' }
    if ($trimmed -match '^[أ-ي]\.\s+') { return 'h5' }

    return $null
}

function Convert-MarkdownLikeToHtml {
    param([string]$Text)

    $normalized = ($Text -replace "`r`n", "`n" -replace "`r", "`n").Trim()
    if ([string]::IsNullOrWhiteSpace($normalized)) {
        return ''
    }

    $lines = $normalized -split "`n"
    $sb = [System.Text.StringBuilder]::new()
    $i = 0

    while ($i -lt $lines.Count) {
        $line = $lines[$i]
        $trimmed = $line.Trim()

        if ([string]::IsNullOrWhiteSpace($trimmed)) {
            $i++
            continue
        }

        if ($trimmed.StartsWith('<')) {
            [void]$sb.AppendLine($trimmed)
            $i++
            continue
        }

        if ($trimmed.StartsWith('|')) {
            $tableRows = New-Object System.Collections.Generic.List[string]
            while ($i -lt $lines.Count -and $lines[$i].Trim().StartsWith('|')) {
                $tableRows.Add($lines[$i].Trim())
                $i++
            }
            [void]$sb.AppendLine((Convert-MarkdownTable $tableRows.ToArray()))
            continue
        }

        if ($trimmed -eq '```plantuml' -or $trimmed -eq '```') {
            $language = if ($trimmed -eq '```plantuml') { 'plantuml' } else { '' }
            $i++
            $codeLines = New-Object System.Collections.Generic.List[string]
            while ($i -lt $lines.Count -and $lines[$i].Trim() -ne '```') {
                $codeLines.Add($lines[$i])
                $i++
            }
            if ($i -lt $lines.Count -and $lines[$i].Trim() -eq '```') {
                $i++
            }

            $codeText = ($codeLines.ToArray() -join "`n").Trim()
            $encodedCode = [System.Net.WebUtility]::HtmlEncode($codeText)
            if ($language) {
                [void]$sb.AppendLine("<pre data-language=""$language"">$encodedCode</pre>")
            } else {
                [void]$sb.AppendLine("<pre>$encodedCode</pre>")
            }
            continue
        }

        if ((Test-ListLine $line)) {
            $items = New-Object System.Collections.Generic.List[object]
            while ($i -lt $lines.Count -and (Test-ListLine $lines[$i])) {
                $items.Add((Parse-ListItem $lines[$i]))
                $i++
            }
            $rendered = Render-List -Items $items.ToArray() -StartIndex 0 -Indent $items[0].Indent -Type $items[0].Type
            [void]$sb.AppendLine($rendered.Html)
            continue
        }

        if ($trimmed -match '^_.*_$') {
            [void]$sb.AppendLine('<div class="note">')
            [void]$sb.AppendLine("<p>$(Convert-InlineText ($trimmed.Trim('_')))</p>")
            [void]$sb.AppendLine('</div>')
            $i++
            continue
        }

        $headingTag = Get-HeadingTag $trimmed
        if ($headingTag) {
            $headingText = $trimmed -replace '^#{1,6}\s+', ''
            [void]$sb.AppendLine("<$headingTag>$(Convert-InlineText $headingText)</$headingTag>")
            $i++
            continue
        }

        $paragraphLines = New-Object System.Collections.Generic.List[string]
        while ($i -lt $lines.Count) {
            $candidate = $lines[$i]
            $candidateTrimmed = $candidate.Trim()
            if ([string]::IsNullOrWhiteSpace($candidateTrimmed)) { break }
            if ($candidateTrimmed.StartsWith('<')) { break }
            if ($candidateTrimmed.StartsWith('|')) { break }
            if ((Test-ListLine $candidate)) { break }
            if ((Get-HeadingTag $candidateTrimmed)) { break }
            if ($candidateTrimmed -match '^_.*_$') { break }
            $paragraphLines.Add($candidateTrimmed)
            $i++
        }

        if ($paragraphLines.Count -gt 0) {
            $paragraph = ($paragraphLines.ToArray() -join ' ')
            [void]$sb.AppendLine("<p>$(Convert-InlineText $paragraph)</p>")
            continue
        }

        $i++
    }

    return $sb.ToString()
}

$preamble = Get-FromStart 'أولاً: المقدمة والنطاق'
$introductionRange = Get-Span 'أولاً: المقدمة والنطاق' 'ثانياً: المصطلحات والتعريفات'
$stakeholderRange = Get-Span '1.3 أصحاب المصلحة' 'ثانياً: المصطلحات والتعريفات'
$glossaryRange = Get-Span 'ثانياً: المصطلحات والتعريفات' 'ثالثاً: الهيكل التنظيمي'
$orgRange = Get-Span 'ثالثاً: الهيكل التنظيمي' 'رابعاً: الإجراءات التفصيلية'
$processRange = Get-Span 'رابعاً: الإجراءات التفصيلية' 'خامساً: الإطار التنظيمي للمؤسسات الصحية المرخصة'
$licensedFrameworkRange = Get-Span 'خامساً: الإطار التنظيمي للمؤسسات الصحية المرخصة' 'سادساً: المتطلبات العامة للنظام الإلكتروني'
$generalSystemRange = Get-Span 'سادساً: المتطلبات العامة للنظام الإلكتروني' 'سابعاً: قواعد وضوابط العمل'
$businessRulesRange = Get-Span 'سابعاً: قواعد وضوابط العمل' 'ثامناً: التكامل وتبادل البيانات'
$integrationRange = Get-Span 'ثامناً: التكامل وتبادل البيانات' 'تاسعاً: المتطلبات غير الوظيفية'
$nfrRange = Get-Span 'تاسعاً: المتطلبات غير الوظيفية' 'عاشراً: مؤشرات الأداء الرئيسية (KPIs)'
$kpiRange = Get-Span 'عاشراً: مؤشرات الأداء الرئيسية (KPIs)' 'الحادي عشر: أفضل الممارسات الخليجية والدولية'
$bestPracticeRange = Get-Span 'الحادي عشر: أفضل الممارسات الخليجية والدولية' 'الثاني عشر: تطبيقات الذكاء الاصطناعي'
$aiRange = Get-Span 'الثاني عشر: تطبيقات الذكاء الاصطناعي' 'الثالث عشر: الفجوات والنقاط المفتوحة'
$gapsRange = Get-Span 'الثالث عشر: الفجوات والنقاط المفتوحة' 'الرابع عشر: المخاطر والتحديات'
$risksRange = Get-Span 'الرابع عشر: المخاطر والتحديات' 'الخامس عشر: المراجع'
$referencesRange = Get-Span 'الخامس عشر: المراجع' 'ملحق رقم 1: قائمة الأمراض المستديمة المباشرة'
$appendicesRange = Get-Span 'ملحق رقم 1: قائمة الأمراض المستديمة المباشرة' ''

$projectDefinitionRange = Get-Span '1.1 الغرض من الوثيقة' '1.3 أصحاب المصلحة'
$scopeRange = Get-Span '1.2 نطاق التطبيق' '1.3 أصحاب المصلحة'

$wiFunctional = Get-Span '4.1.6 المتطلبات الوظيفية' '4.2.1 الفئة المستهدفة'
$disabilityFunctional = Get-Span '4.2.7 المتطلبات الوظيفية' '4.3.1 المقدمة والسياق التنظيمي'
$permanentDiseaseFunctional = Get-Span '4.3.10 المتطلبات الوظيفية' '4.4.1 أنواع اللجان'
$committeeFunctional = Get-Span '4.4.6 المتطلبات الوظيفية' '4.5.1 أصحاب الحق في التظلم'
$appealFunctional = Get-Span '4.5.9 المتطلبات الوظيفية' '4.6.1 نطاق التقديم على الترخيص'
$licensingFunctional = Get-Span '4.6.7 المتطلبات الوظيفية' '4.7.1 الفئة المستهدفة'
$retirementFunctional = Get-Span '4.7.7 المتطلبات الوظيفية' '4.8.1 الفئة المستهدفة'
$directReferralFunctional = Get-Span '4.8.7 المتطلبات الوظيفية' 'خامساً: الإطار التنظيمي للمؤسسات الصحية المرخصة'
$generalFunctional = Get-Span '6.12 المتطلبات الوظيفية العامة على مستوى النظام' 'سابعاً: قواعد وضوابط العمل'

$committeeScreenRange = Get-Span '4.4.3 متطلبات شاشة المؤسسات الصحية المرخصة' '4.4.5 مؤشرات الأداء الرئيسية (KPIs)'
$committeeMethodRange = Get-Span '4.4.1 أنواع اللجان' '4.4.5 مؤشرات الأداء الرئيسية (KPIs)'
$permanentDiseaseDecisionRange = Get-Span '4.3.6 قواعد الاستحقاق والصرف المالي' '4.3.10 المتطلبات الوظيفية'
$appendix3Range = Get-Span 'ملحق رقم 3: Medical Severity Index and Treatment Burden' 'ملحق رقم 4: مقياس الأداء الوظيفي الشامل للأمراض المستديمة (تقييم اللجان الطبية)'
$appendix4Range = Get-Span 'ملحق رقم 4: مقياس الأداء الوظيفي الشامل للأمراض المستديمة (تقييم اللجان الطبية)' 'ملحق رقم 5: جدول الأمراض المهنية'

$committeeKpiRange = Get-Span '4.4.5 مؤشرات الأداء الرئيسية (KPIs)' '4.4.6 المتطلبات الوظيفية'
$appealKpiRange = Get-Span '4.5.8 مؤشرات الأداء الرئيسية (KPIs)' '4.5.9 المتطلبات الوظيفية'
$retirementKpiRange = Get-Span '4.7.6 مؤشرات الأداء الرئيسية (KPIs)' '4.7.7 المتطلبات الوظيفية'
$directReferralKpiRange = Get-Span '4.8.6 مؤشرات الأداء الرئيسية (KPIs)' '4.8.7 المتطلبات الوظيفية'

$nfrDetailedRange = Get-Span '6.1 الأمن والمصادقة' '6.12 المتطلبات الوظيفية العامة على مستوى النظام'
$integrationDetailedRange = Get-Span '6.4 التكاملات الإلكترونية المطلوبة' '6.5 الطباعة والوثائق'

$businessNeedText = @'
تُظهر الوثيقة أن الحاجة الأساسية تتمثل في:

- توفير مرجع موحّد وشامل لجميع إجراءات مديرية إصابات العمل والأمراض المهنية والشؤون الطبية.
- تحديد متطلبات النظام الإلكتروني الداعم للإجراءات.
- توثيق كامل لمتطلبات الأمراض المستديمة شاملاً قواعد الاستحقاق ومسارات المعالجة وآليات الصرف.
- تغطية شاملة لجميع الإجراءات التشغيلية ومتطلبات الأنظمة الإلكترونية المرافقة.
- توثيق الإطار التنظيمي الكامل للمؤسسات الصحية المرخصة ومتطلبات تتبع الأداء.
- معالجة الفجوات والنقاط المفتوحة المرتبطة بالتفويض، الاعتراض الداخلي، الاستثناءات، الأعطال التقنية، ومصفوفة المسؤوليات.
'@

$goalsText = @'
الأهداف ومحركات العمل كما عكستها الوثيقة:

- توفير مرجع موحّد وشامل لجميع إجراءات المديرية.
- تحديد متطلبات النظام الإلكتروني اللازم لأتمتة هذه الإجراءات.
- الاستفادة من أفضل الممارسات في دول الخليج العربي.
- توفير أساس موحّد للتصميم التفصيلي والتطوير والاختبار والتنفيذ.
- تمكين المستفيدين من الوصول إلى المنافع وفق ضوابط واضحة وشفافة.
- تنظيم التشخيص والتوثيق والتقييم والتظلم والصرف.
- تعزيز كفاءة اتخاذ القرار الطبي والإداري.
- ضمان سلامة القرارات وإمكانية التدقيق.

معايير النجاح المستندة إلى الوثيقة:

- معدل إنجاز طلبات الانقطاع عن العمل ≥ 90%.
- معدل رضا مقدمي الطلبات ≥ 85%.
- نسبة الطلبات المكتملة من أول تقديم ≥ 70%.
- نسبة الحالات المصروفة في موعدها ≥ 98%.
- معدل اكتمال مراقبة المؤسسات الصحية المرخصة = 100%.
'@

$capabilityText = @'
القدرات الرئيسية التي تغطيها الوثيقة:

- إدارة طلبات صرف بدلات الانقطاع عن العمل.
- إدارة منفعة الأشخاص ذوي الإعاقة.
- إدارة منفعة الأمراض المستديمة.
- إدارة الاستعلام عن تقاعد الأشخاص ذوي الإعاقة.
- إدارة التنسيق مع المؤسسات الصحية المرخصة.
- إدارة طلبات العرض على المؤسسات الصحية المرخصة.
- إدارة التظلمات من قرارات المؤسسات الصحية المرخصة.
- إدارة التراخيص والرقابة على المؤسسات الصحية المرخصة.
- إدارة السجل الزمني والمرفقات والملاحظات والتوقيعات الإلكترونية.
- إدارة التحقق الآلي، الإشعارات، SLA، ولوحات المعلومات.
'@

$requestLifecycleText = @'
دورة الحالات التشغيلية العامة كما تظهر في المسارات التفصيلية:

| الإجراء | دورة الحالة التشغيلية |
| --- | --- |
| طلب صرف بدلات الانقطاع عن العمل | التقديم → التحقيق → قرار رئيس قسم التحقيق → مراجعة الإجازات المرضية → اعتماد / إحالة إلى قسم اللجان الطبية → الصرف / الإغلاق / الاعتراض الداخلي |
| منفعة الأشخاص ذوي الإعاقة | التقديم → التحقق من البطاقة → مراجعة الموظف → قرار رئيس القسم → الصرف أو الإيقاف أو الإغلاق |
| منفعة الأمراض المستديمة | استقبال بيانات التشخيص → التصنيف الآلي عبر طبقة التكامل → استحقاق مباشر أو إحالة إلى مؤسسة صحية مرخصة → قرار الاعتماد / الرفض → الصرف → إعادة التقييم الدوري |
| التنسيق مع المؤسسات الصحية المرخصة | استلام الإحالة → التحقق من المتطلبات → جدولة الجلسة → انعقاد الجلسة → إصدار القرار → تنفيذ القرار أو التظلم عليه |
| التظلم | تقديم التظلم → التحقق من المدة والصلاحية → جدولة اللجنة → الفحص / الجلسة → القرار النهائي الملزم → تنفيذ الأثر |
| طلبات تقاعد الأشخاص ذوي الإعاقة | استقبال الطلب من نظام المستحقات → مراجعة الموظف المختص → توصية → اعتماد رئيس القسم → إرسال النتيجة إلى نظام المستحقات |
| طلب العرض على المؤسسات الصحية المرخصة | تقديم الطلب من المؤمن عليه أو صاحب العمل أو الجهة المخولة → مراجعة قسم اللجان الطبية → جدولة الجلسة → القرار الطبي → إشعار الجهة المختصة |
'@

$userStoriesText = @'
| الدور | قصة المستخدم | معايير قبول مختصرة |
| --- | --- | --- |
| العامل / المؤمن عليه | بصفتي مؤمناً عليه أريد تقديم طلب صرف بدلات الانقطاع عن العمل وإرفاق المستندات المطلوبة حتى يتم التحقيق في حالتي واتخاذ القرار المناسب. | التحقق من اكتمال البيانات، حفظ الطلب كمسودة، إشعاري بأي استيفاء أو قرار. |
| الشخص المفوض من جهة العمل | بصفتي مفوضاً من جهة العمل أريد تقديم الطلبات نيابة عن العمال المنتسبين للمنشأة حتى يتم تسجيل البلاغات ومتابعتها نظامياً. | تسجيل بيانات المفوض، التحقق من علاقة العامل بالجهة، إظهار العمال المرتبطين بالمنشأة. |
| موظف التحقيق | بصفتي موظف تحقيق أريد الاطلاع على كامل بيانات الطلب والعامل وجهة العمل والسجل السابق حتى أتمكن من إعداد محضر التحقيق واتخاذ التوصية المناسبة. | Check-In/Check-Out، حفظ المحضر كمسودة، نقل الطلبات بين القسمين، تسجيل الملاحظات والمرفقات. |
| موظف الإجازات المرضية | بصفتي موظف إجازات مرضية أريد مراجعة فترات الإجازة وربطها بنظام نهر الشفاء حتى أحدد الفترات المستحقة أو أوصي بالإحالة إلى اللجان الطبية. | الاستعلام عن الإجازات، إدخال فترات متعددة، اعتماد رئيس القسم، التحقق قبل الصرف. |
| موظف قسم اللجان الطبية | بصفتي موظفاً في قسم اللجان الطبية أريد جدولة الحالات المعروضة على المؤسسات الصحية المرخصة ومتابعة قراراتها حتى يتم تنفيذ القرارات أو التظلم عليها. | جدولة الجلسات، التحقق من النصاب، حفظ القرارات، تتبع الإشعارات والأثر التنفيذي. |
| موظف الإعاقة والأمراض المستديمة | بصفتي موظفاً مختصاً أريد التحقق من بطاقة الإعاقة أو من بيانات الأمراض المستديمة واتخاذ التوصية المناسبة حتى يتم صرف المنفعة أو رفضها أو إعادة تقييمها. | التحقق من البطاقة، التصنيف الآلي، عرض بيانات التأمين، إدارة الإيقاف الآلي وإعادة التقييم. |
| عضو مؤسسة صحية مرخصة | بصفتي عضواً في مؤسسة صحية مرخصة أريد الاطلاع على الحالة الطبية وإصدار قرار مسبب وموثق حتى يتم تحديد نسبة العجز أو الاستحقاق وفق الضوابط. | حضور الجلسة، مراعاة النصاب، توثيق القرار، التوقيع الإلكتروني، الالتزام بالسرية. |
| مقدم تظلم | بصفتي متظلماً أريد تقديم تظلم خلال المدة النظامية وإرفاق ما أراه من أدلة حتى تنظر لجنة التظلمات في طلبي وتصدر قراراً نهائياً وملزماً. | التحقق من المدة، قبول المرفقات، إشعارات الجلسة، قرار نهائي ملزم وغير قابل للطعن. |
'@

$dataRequirementsText = @'
أهم متطلبات البيانات كما وردت في الوثيقة:

- بيانات مقدم الطلب: الصفة، الهوية، وسائل التواصل، بيانات التفويض عند الاقتضاء.
- بيانات المؤمن عليه: البيانات الشخصية، بيانات التأمين، تاريخ التوظيف، الأجور، عنوان الإقامة الدائم والمؤقت.
- بيانات جهة العمل: السجل التجاري، الفرع، بيانات المفوض، بيانات الامتثال ذات الصلة.
- بيانات الإصابة أو المرض: نوع الحالة، تاريخ الإصابة أو التأكيد الطبي، المستندات الداعمة، تاريخ التبليغ، أسباب القبول أو الرفض.
- بيانات الإجازات المرضية: الفترات، الرصيد، نتيجة الاستعلام من نهر الشفاء، فترات الصرف.
- بيانات اللجان: نوع الجلسة، الحضور، النصاب، نتيجة الفحص، القرار، أسباب القرار، التوقيعات.
- بيانات الصرف: بيانات المستفيد، الفترة، نوع الاستحقاق، قيمة الاستحقاق، نتيجة الربط مع نظام الصرف.
- بيانات المرفقات والسجل الزمني: المرفق، مصدره، توقيته، الإجراء المرتبط به، المستخدم الذي أجرى الإجراء.
'@

$internalIntegrationText = @'
التكاملات الداخلية الحالية ذات الصلة بالصندوق:

| النظام أو المكوّن | الاستخدام داخل الوثيقة |
| --- | --- |
| نظام المستحقات | استقبال طلبات تقاعد الأشخاص ذوي الإعاقة آلياً وإرسال نتيجة المعالجة النهائية إليه. |
| النظام المسؤول عن عملية الصرف / نظام الصرف | تغيير حالة الطلب إلى معتمد تمهيداً للإرسال، وتحديث حالة الطلب بحالة الصرف أو التعليق أو الرفض مع السبب عند استلام نتيجة تأكيد الصرف. |
| الإدارة المالية | إرسال أوامر الصرف إليها متضمنة بيانات المستفيد والفترة ونوع الاستحقاق وقيمة الاستحقاق. |
| نظام إدارة الوثائق DMS | حفظ واسترجاع وإدارة الوثائق والمرفقات. |
| طبقة التكامل Integration Layer | تصنيف حالات الأمراض المستديمة آلياً واستقبال البيانات المتبادلة مع الأنظمة والجهات المختلفة. |
| الأنظمة الداخلية الأخرى | استقبال الطلبات المحالة منها وتطبيق ضوابط تحقق آلية عليها قبل المراجعة البشرية. |
'@

$smartValidationText = @'
تم إعداد هذا القسم استناداً إلى المتطلبات الوظيفية، المتطلبات غير الوظيفية، ومؤشرات الأداء الواردة في الوثيقة، بحيث تكون صياغة المتطلبات:

| البعد | كيفية تحققه في هذه الوثيقة |
| --- | --- |
| Specific | المتطلبات تربط الفاعل بالفعل والقيد مثل: التحقق الآلي من اكتمال الوثائق، الربط مع نهر الشفاء، Check-In/Check-Out، وإرسال النتيجة إلى نظام المستحقات. |
| Measurable | الوثيقة تحتوي على مؤشرات أداء ونوافذ زمنية واضحة مثل 20 يوم عمل للمعاينة، 60 يوماً للتظلم، و≤ 1 يوم عمل للتصنيف الآلي لبعض الحالات. |
| Achievable | المتطلبات مبنية على إجراءات قائمة، وتكاملات محددة، وصلاحيات معروفة، مع الإبقاء على الاستثناءات ضمن مسارات يدوية أو إشرافية عند الحاجة. |
| Relevant | كل متطلب مرتبط مباشرة بإجراءات المديرية، بالصرف، بالتحقق الطبي، أو بسلامة القرار والامتثال. |
| Time-bound | الوثيقة تحدد مدد الإبلاغ، مدد التظلم، تواريخ الصرف، نوافذ إعادة التقييم، ومؤشرات زمن المعالجة لكل مسار رئيسي. |

أمثلة تحقق مختصرة:

| المجال | مثال لصياغة متطلب | لماذا يحقق SMART |
| --- | --- | --- |
| إصابات العمل | يجب التحقق إلكترونياً من اكتمال المستندات قبل إحالة الطلب للتحقيق. | محدد وقابل للاختبار ومرتبط بزمن الإحالة الفعلي. |
| الأمراض المستديمة | يُصنّف نظام الصندوق الحالات تلقائياً عبر طبقة التكامل إلى مسار استحقاق مباشر أو مسار تقييم اللجان الطبية. | محدد، قابل للقياس من سجلات التكامل، ومرتبط بنتيجة تشغيلية واضحة. |
| التظلمات | يحق لأصحاب الحق تقديم التظلم خلال 60 يوماً من تاريخ العلم بقرار المؤسسة الصحية المرخصة. | محدد، زمني، وقابل للتحقق من تاريخ القرار والتقديم. |
| اللجان الطبية | يجب على المؤسسة الصحية المرخصة معاينة الحالات خلال عشرين (20) يوم عمل من تاريخ إحالة الحالات إليها من صندوق الحماية الاجتماعية. | متطلب زمني مباشر قابل للقياس. |
'@

$exceptionPolicyText = @'
سياسات الاستثناءات والمعالجة اليدوية المستنبطة مباشرة من الوثيقة:

- إذا تعذّر على جهة العمل الإبلاغ بسبب انتهاء نشاطها أو الإفلاس أو التصفية، أو إذا امتنعت عن الإبلاغ، يجوز للمؤمن عليه الإبلاغ مباشرة إلى الصندوق.
- إذا نتج عن نفس الواقعة أكثر من إصابة أو إصابة أكثر من مؤمن عليه، يُكتفى بإجراء تحقيق واحد يشمل جميع البلاغات.
- إذا كان اتجاه السير أثناء الحادث من السكن الدائم إلى السكن الثانوي، أو عند ثبوت مخالفة المؤمن عليه، يتم توجيه الطلب مباشرة إلى قسم اللجان الطبية بعد اعتماد التحقيق.
- يجوز الاكتفاء بالتقارير الطبية أو استخدام وسائل الاتصال المرئي في الحالات الاستثنائية: إذا كان المؤمن عليه خارج السلطنة، أو طريح الفراش، أو داخل السجن، أو عند إعادة الكشف الدوري، أو عند وجود عذر مقبول للمؤسسة الصحية المرخصة.
- يجوز للمؤسسة الصحية المرخصة الاستعانة برأي طبيب أخصائي أول أو أعلى في الحالات التي تتطلب ذلك دون أن يكون لهذا الطبيب حق التصويت.
- يجب أن يدعم النظام التعامل مع فشل التكاملات الخارجية، مع تسجيل سبب الفشل وإتاحة إعادة المحاولة وفق الصلاحيات المعتمدة.
- يجب أن يتيح النظام تسجيل الطلبات أو الإحالات الواردة من جهات خارجية أو وحدات داخلية يدوياً من قبل المستخدم الداخلي المخول، مع حفظ مصدر الإحالة ومرجعها والجهة الواردة منها.
- عند إلغاء بطاقة الإعاقة من وزارة التنمية الاجتماعية، تُوقَف المنفعة فوراً وآلياً.
'@

$dependenciesText = @'
الاعتماديات الرئيسية كما تظهر في الوثيقة:

| الاعتمادية | أثرها على التنفيذ |
| --- | --- |
| جاهزية التكامل مع وزارة الصحة / نهر الشفاء | أساسي للاستعلام عن الإجازات المرضية والتقارير الطبية ولتدفق بيانات الأمراض المستديمة. |
| جاهزية التكامل مع وزارة التنمية الاجتماعية | أساسي للتحقق من بطاقات الإعاقة، استلام الإلغاءات اليومية، وإيقاف الصرف عند الإلغاء. |
| جاهزية التكامل مع السجل المدني ووزارة التجارة | أساسي لتحديد العناوين السكنية والتحقق من السجلات التجارية والاختصاص الجغرافي والجهات المخولة. |
| اعتماد المنصة المرئية الآمنة | أساسي لدعم الاجتماعات المرئية عن بُعد وحالات الفحص الاستثنائي. |
| اكتمال تصنيف الصلاحيات والاختصاصات الجغرافية | لازم لتوزيع الطلبات، تقييد الوصول، وتحديد الاختصاص بين اللجان والمؤسسات الصحية. |
| توضيح الفجوات والنقاط المفتوحة | مطلوب قبل الإغلاق النهائي للمتطلبات، خصوصاً في RACI، إجراءات الأعطال، والاستثناءات التفصيلية. |
'@

$decisionLogText = @'
| النوع | القرار أو النقطة | الحالة |
| --- | --- | --- |
| قرار أعمال | قرار لجنة التظلمات نهائي وملزم وغير قابل للطعن أو الاستئناف أمام أي جهة أخرى. | معتمد في الوثيقة |
| قرار أعمال | نافذة التظلم 60 يوماً من تاريخ العلم بالقرار، ولا يُقبل أي تظلم بعد مرور سنة كاملة من تاريخ صدور القرار. | معتمد في الوثيقة |
| قرار أعمال | القرار النهائي في تطبيقات الذكاء الاصطناعي يبقى حصراً بيد الموظف البشري أو اللجنة الطبية. | معتمد في الوثيقة |
| نقطة مفتوحة | آلية التحقق من صلاحية مقدم الطلب غير العامل المتضرر مباشرة. | مفتوحة |
| نقطة مفتوحة | تعريف مسار طعن داخلي بجدول زمني محدد قبل أي إجراء خارجي. | مفتوحة |
| نقطة مفتوحة | تفاصيل حالات الاستثناء من الفحص الحضوري والشروط والإجراءات المحددة. | مفتوحة |
| نقطة مفتوحة | مصفوفة RACI للمسؤوليات والصلاحيات لكل دور. | مفتوحة |
| نقطة مفتوحة | آلية التعامل مع البيانات الواردة من مؤسسات صحية في حالات الأعطال التقنية. | مفتوحة |
'@

$signoffText = @'
هذا القسم تم استكماله اعتماداً على طبيعة الوثيقة وحوكمتها المتوقعة:

| البند | التوجيه |
| --- | --- |
| المراجعة | تُراجع الوثيقة من أصحاب المصلحة التشغيليين في أقسام التحقيق، الإجازات المرضية، اللجان الطبية، الإعاقة والأمراض المستديمة، والتراخيص والرقابة. |
| المراجعة القانونية | تُراجع من الجهة القانونية المختصة للتحقق من مواءمتها مع قانون الحماية الاجتماعية واللوائح ذات الصلة. |
| المراجعة التقنية | تُراجع من فرق التحليل والتصميم والتكامل والأمن المعلوماتي قبل بدء التطوير. |
| الاعتماد | يعتمد الإصدار النهائي من الجهة المالكة للأعمال بعد إغلاق الفجوات والنقاط المفتوحة ذات الأولوية. |
| إدارة التغيير | أي تعديل لاحق على القواعد أو المتطلبات أو التكاملات أو النماذج المرجعية يجب أن يمر عبر سجل النسخ وسجل القرارات المعتمدة. |
'@

$plantUmlText = @'
### مخطط عام لمسار طلب صرف بدلات الانقطاع عن العمل

```plantuml
@startuml
start
:تقديم الطلب;
:التحقق من اكتمال البيانات والمرفقات;
if (مكتمل؟) then (نعم)
  :إحالة إلى قسم التحقيق المختص;
  :إعداد محضر التحقيق والتوصية;
  if (اعتماد رئيس القسم؟) then (نعم)
    :مراجعة الإجازات المرضية;
    if (يلزم عرض طبي؟) then (نعم)
      :إحالة إلى قسم اللجان الطبية;
      :عرض على المؤسسة الصحية المرخصة;
      :استلام القرار;
    endif
    :الاعتماد للصرف أو الإغلاق;
  else (إعادة/رفض)
    :إعادة أو رفض مع السبب;
  endif
else (لا)
  :استيفاء من مقدم الطلب;
endif
stop
@enduml
```

### مخطط عام لمسار الأمراض المستديمة

```plantuml
@startuml
start
:استلام بيانات التشخيص من المؤسسة الصحية;
:تصنيف الحالة عبر طبقة التكامل;
if (استحقاق مباشر؟) then (نعم)
  :مراجعة واعتماد الصرف;
else (لا)
  :إحالة إلى مؤسسة صحية مرخصة;
  :فحص الحالة وإصدار القرار;
endif
:تحديث حالة الطلب;
:الصرف;
:إعادة التقييم الدوري عند الاستحقاق;
stop
@enduml
```

### مخطط عام لمسار التظلم

```plantuml
@startuml
start
:تقديم التظلم;
:التحقق من الصفة والمدة;
if (مقبول شكلاً؟) then (نعم)
  :جدولة لجنة التظلمات;
  :الفحص/الجلسة;
  :إصدار القرار النهائي الملزم;
  :تنفيذ الأثر وإشعار الأطراف;
else (لا)
  :رفض التظلم شكلاً مع السبب;
endif
stop
@enduml
```
'@

$sections = [ordered]@{
    'executive-summary' = @{
        Title = 'الملخص التنفيذي'
        Body  = (Convert-MarkdownLikeToHtml $preamble)
    }
    'project-definition' = @{
        Title = 'التعريف بالمشروع ومصادر الوثيقة'
        Body  = (Convert-MarkdownLikeToHtml $projectDefinitionRange)
    }
    'business-need' = @{
        Title = 'حاجة العمل / بيان المشكلة'
        Body  = (Convert-MarkdownLikeToHtml $businessNeedText)
    }
    'goals-drivers' = @{
        Title = 'الأهداف ومحركات العمل ومعايير النجاح'
        Body  = (Convert-MarkdownLikeToHtml $goalsText)
    }
    'scope' = @{
        Title = 'النطاق والقيود والافتراضات'
        Body  = (Convert-MarkdownLikeToHtml ($scopeRange + "`n`n" + $gapsRange))
    }
    'capability-map' = @{
        Title = 'خريطة القدرات الرئيسية'
        Body  = (Convert-MarkdownLikeToHtml ($capabilityText + "`n`n" + $orgRange))
    }
    'stakeholders' = @{
        Title = 'أصحاب المصلحة والأدوار'
        Body  = (Convert-MarkdownLikeToHtml ($stakeholderRange + "`n`n" + $orgRange))
    }
    'legal-framework' = @{
        Title = 'الإطار القانوني والتنظيمي'
        Body  = (Convert-MarkdownLikeToHtml ($licensedFrameworkRange + "`n`n" + $referencesRange))
    }
    'proposed-process' = @{
        Title = 'العملية المقترحة'
        Body  = (Convert-MarkdownLikeToHtml $processRange)
    }
    'request-lifecycle' = @{
        Title = 'دورة الحالات التشغيلية'
        Body  = (Convert-MarkdownLikeToHtml $requestLifecycleText)
    }
    'functional-requirements' = @{
        Title = 'المتطلبات الوظيفية'
        Body  = (Convert-MarkdownLikeToHtml ($wiFunctional + "`n`n" + $disabilityFunctional + "`n`n" + $permanentDiseaseFunctional + "`n`n" + $committeeFunctional + "`n`n" + $appealFunctional + "`n`n" + $licensingFunctional + "`n`n" + $retirementFunctional + "`n`n" + $directReferralFunctional + "`n`n" + $generalFunctional))
    }
    'user-stories' = @{
        Title = 'قصص المستخدم'
        Body  = (Convert-MarkdownLikeToHtml $userStoriesText)
    }
    'decision-methodology' = @{
        Title = 'منهجية الإحالة والتقييم واتخاذ القرار الطبي'
        Body  = (Convert-MarkdownLikeToHtml ($permanentDiseaseDecisionRange + "`n`n" + $committeeMethodRange + "`n`n" + $appendix3Range + "`n`n" + $appendix4Range))
    }
    'non-functional-requirements' = @{
        Title = 'المتطلبات غير الوظيفية'
        Body  = (Convert-MarkdownLikeToHtml ($nfrDetailedRange + "`n`n" + $nfrRange))
    }
    'business-rules' = @{
        Title = 'قواعد العمل'
        Body  = (Convert-MarkdownLikeToHtml $businessRulesRange)
    }
    'ui-requirements' = @{
        Title = 'متطلبات واجهة المستخدم'
        Body  = (Convert-MarkdownLikeToHtml ($committeeScreenRange + "`n`n" + @'
متطلبات واجهة المستخدم المستفادة من الوثيقة:

- عرض مسار العمل المتوقع لكل طلب أعلى صفحة تفاصيل الطلب مع تمييز المرحلة الحالية.
- توفير تبويبات أو أقسام واضحة في صفحة التفاصيل تشمل البيانات الأساسية، التحقق من البيانات، المرفقات، المراسلات، السجل الزمني، الملاحظات التشغيلية، والإجراء المتخذ.
- عرض حالة الطلب الحالية بشكل واضح، وإظهار الإجراءات المتاحة فقط للدور المناسب.
- إتاحة البحث والفلاتر المنطقية والفلاتر السريعة حسب الحالة.
- دعم كامل للغة العربية RTL والتصميم المتجاوب.
'@))
    }
    'data-requirements' = @{
        Title = 'متطلبات البيانات'
        Body  = (Convert-MarkdownLikeToHtml ($dataRequirementsText + "`n`n" + (Get-Span '4.1.2 تعريف إصابة العمل والحالات المستثناة' '4.1.3 مهل الإبلاغ القانونية (استناداً إلى اللائحة)') + "`n`n" + $integrationRange))
    }
    'integration-requirements' = @{
        Title = 'متطلبات التكامل'
        Body  = (Convert-MarkdownLikeToHtml ($integrationDetailedRange + "`n`n" + $integrationRange))
    }
    'internal-integrations' = @{
        Title = 'التكامل مع الأنظمة الداخلية الحالية في الصندوق'
        Body  = (Convert-MarkdownLikeToHtml $internalIntegrationText)
    }
    'smart-validation' = @{
        Title = 'التحقق من المتطلبات وفق SMART'
        Body  = (Convert-MarkdownLikeToHtml $smartValidationText)
    }
    'kpis' = @{
        Title = 'مؤشرات الأداء التشغيلية'
        Body  = (Convert-MarkdownLikeToHtml ($committeeKpiRange + "`n`n" + $appealKpiRange + "`n`n" + $retirementKpiRange + "`n`n" + $directReferralKpiRange + "`n`n" + $kpiRange))
    }
    'risks' = @{
        Title = 'المخاطر وخطط التخفيف'
        Body  = (Convert-MarkdownLikeToHtml $risksRange)
    }
    'exception-policy' = @{
        Title = 'سياسات الاستثناءات والمعالجة اليدوية'
        Body  = (Convert-MarkdownLikeToHtml ($exceptionPolicyText + "`n`n" + (Get-Span 'حالات الإبلاغ المباشر من المؤمن عليه - المادة (١٤)' '4.1.4 مراحل العملية التفصيلية') + "`n`n" + (Get-Span 'السرية وحماية البيانات' 'يهدف هذا الفصل إلى وضع إطار شامل لضمان الجودة ومراقبة عمل المؤسسات الصحية المرخصة، وذلك وفقًا لمؤشرات الأداء الرئيسية (KPIs) المعتمدة، لضمان الكفاءة والدقة والامتثال لأحكام قانون الحماية الاجتماعية.') ))
    }
    'dependencies' = @{
        Title = 'الاعتماديات'
        Body  = (Convert-MarkdownLikeToHtml ($dependenciesText + "`n`n" + $gapsRange))
    }
    'plantuml' = @{
        Title = 'الرسوم النصية PlantUML'
        Body  = (Convert-MarkdownLikeToHtml $plantUmlText)
    }
    'decision-log' = @{
        Title = 'سجل القرارات المعتمدة'
        Body  = (Convert-MarkdownLikeToHtml $decisionLogText)
    }
    'glossary' = @{
        Title = 'المسرد والتعريفات'
        Body  = (Convert-MarkdownLikeToHtml $glossaryRange)
    }
    'signoff' = @{
        Title = 'إجراءات المراجعة والاعتماد وإدارة التغيير'
        Body  = (Convert-MarkdownLikeToHtml $signoffText)
    }
    'version-history' = @{
        Title = 'سجل النسخ'
        Body  = (Convert-MarkdownLikeToHtml (@'
| البند | القيمة |
| --- | --- |
| اسم المستند | وثيقة متطلبات الأعمال للإجراءات الخاصة بمديرية إصابات العمل والأمراض المهنية والشؤون الطبية |
| الجهة المُصدِرة | قسم تحليل الأعمال والنفاذ الرقمي |
| الإصدار | 1.0 |
| التاريخ | 24 مارس 2026 |
| الحالة | مسودة للمراجعة |
| درجة السرية | للاستخدام الداخلي |

سجل التغييرات

| الوصف | الإصدار | المسؤول | التاريخ |
| --- | --- | --- | --- |
| الإصدار الأولي من وثيقة متطلبات الأعمال | 1.0 | حمدي احمد | مايو 2026 |
'@))
    }
    'appendices' = @{
        Title = 'الملاحق'
        Body  = (Convert-MarkdownLikeToHtml ($bestPracticeRange + "`n`n" + $aiRange + "`n`n" + $gapsRange + "`n`n" + $referencesRange + "`n`n" + $appendicesRange))
    }
}

$sectionOrder = @(
    'executive-summary',
    'project-definition',
    'business-need',
    'goals-drivers',
    'scope',
    'capability-map',
    'stakeholders',
    'legal-framework',
    'proposed-process',
    'request-lifecycle',
    'functional-requirements',
    'user-stories',
    'decision-methodology',
    'non-functional-requirements',
    'business-rules',
    'ui-requirements',
    'data-requirements',
    'integration-requirements',
    'internal-integrations',
    'smart-validation',
    'kpis',
    'risks',
    'exception-policy',
    'dependencies',
    'plantuml',
    'decision-log',
    'glossary',
    'signoff',
    'version-history',
    'appendices'
)

$mainBuilder = [System.Text.StringBuilder]::new()
foreach ($sectionId in $sectionOrder) {
    $section = $sections[$sectionId]
    if (-not $section) {
        throw "Missing section definition: $sectionId"
    }

    [void]$mainBuilder.AppendLine("            <section id=""$sectionId"">")
    [void]$mainBuilder.AppendLine("                <h2>$($section.Title)</h2>")
    $bodyLines = ($section.Body.Trim() -split "`n")
    foreach ($bodyLine in $bodyLines) {
        [void]$mainBuilder.AppendLine("                $bodyLine")
    }
    [void]$mainBuilder.AppendLine("            </section>")
    [void]$mainBuilder.AppendLine()
}

$mainContent = $mainBuilder.ToString().TrimEnd()

$html = @"
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>وثيقة متطلبات الأعمال - مديرية إصابات العمل والأمراض المهنية والشؤون الطبية</title>
    <link rel="stylesheet" href="Directorate-WorkInjuries-Full-BRD.css">
</head>
<body>
    <div class="page">
        <header class="hero">
            <div class="hero-row">
                <img src="../../Saving/SPF_logo_gold.svg" class="hero-logo" alt="Logo" />
                <div class="hero-title-wrap">
                    <h1>وثيقة متطلبات الأعمال<br>مديرية إصابات العمل والأمراض المهنية والشؤون الطبية</h1>
                    <p>تمت تعبئة هذه الوثيقة اعتماداً على ملف <code>docs/MeetingNote.md</code>، مع استكمال الأقسام غير المغطاة مباشرة وفق فهم الوثيقة نفسها.</p>
                </div>
            </div>
            <div class="meta">
                <div><strong>الإصدار</strong><br>1.0</div>
                <div><strong>التاريخ</strong><br>24 مارس 2026</div>
                <div><strong>الحالة</strong><br>مسودة للمراجعة</div>
                <div><strong>درجة السرية</strong><br>للاستخدام الداخلي</div>
            </div>
        </header>
        <nav>
            <div class="toc-header">
                <h2>فهرس المحتويات</h2>
                <div class="toc-actions">
                    <button type="button" id="expand-all-sections" class="toc-btn">Expand All</button>
                    <button type="button" id="collapse-all-sections" class="toc-btn">Collapse All</button>
                </div>
            </div>
            <ul>
                <li><a href="#executive-summary">الملخص التنفيذي</a></li>
                <li><a href="#project-definition">التعريف بالمشروع ومصادر الوثيقة</a></li>
                <li><a href="#business-need">حاجة العمل / بيان المشكلة</a></li>
                <li><a href="#goals-drivers">الأهداف ومحركات العمل ومعايير النجاح</a></li>
                <li><a href="#scope">النطاق والقيود والافتراضات</a></li>
                <li><a href="#capability-map">خريطة القدرات الرئيسية</a></li>
                <li><a href="#stakeholders">أصحاب المصلحة والأدوار</a></li>
                <li><a href="#legal-framework">الإطار القانوني والتنظيمي</a></li>
                <li><a href="#proposed-process">العملية المقترحة</a></li>
                <li><a href="#request-lifecycle">دورة الحالات التشغيلية</a></li>
                <li><a href="#functional-requirements">المتطلبات الوظيفية</a></li>
                <li><a href="#user-stories">قصص المستخدم</a></li>
                <li><a href="#decision-methodology">منهجية الإحالة والتقييم واتخاذ القرار الطبي</a></li>
                <li><a href="#non-functional-requirements">المتطلبات غير الوظيفية</a></li>
                <li><a href="#business-rules">قواعد العمل</a></li>
                <li><a href="#ui-requirements">متطلبات واجهة المستخدم</a></li>
                <li><a href="#data-requirements">متطلبات البيانات</a></li>
                <li><a href="#integration-requirements">متطلبات التكامل</a></li>
                <li><a href="#internal-integrations">التكامل مع الأنظمة الداخلية الحالية في الصندوق</a></li>
                <li><a href="#smart-validation">التحقق من المتطلبات وفق SMART</a></li>
                <li><a href="#kpis">مؤشرات الأداء التشغيلية</a></li>
                <li><a href="#risks">المخاطر وخطط التخفيف</a></li>
                <li><a href="#exception-policy">سياسات الاستثناءات والمعالجة اليدوية</a></li>
                <li><a href="#dependencies">الاعتماديات</a></li>
                <li><a href="#plantuml">الرسوم النصية PlantUML</a></li>
                <li><a href="#decision-log">سجل القرارات المعتمدة</a></li>
                <li><a href="#glossary">المسرد والتعريفات</a></li>
                <li><a href="#signoff">إجراءات المراجعة والاعتماد وإدارة التغيير</a></li>
                <li><a href="#version-history">سجل النسخ</a></li>
                <li><a href="#appendices">الملاحق</a></li>
            </ul>
        </nav>
        <main>
$mainContent
        </main>
    </div>
    <script src="Directorate-WorkInjuries-Full-BRD.js"></script>
</body>
</html>
"@

[System.IO.File]::WriteAllText($htmlPath, $html, [System.Text.UTF8Encoding]::new($false))
Write-Host "Generated $htmlPath"
