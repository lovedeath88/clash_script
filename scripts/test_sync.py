import urllib.request
import re

REMOTE_URL = 'https://raw.githubusercontent.com/shangrenxi/Rules/refs/heads/master/rules/AI.list'
RULE_FILES = ['Rules/Baa_Agent.yaml', 'Rules/Baa_USA.yaml', 'Rules/Baa_CN.yaml']

req = urllib.request.Request(REMOTE_URL, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=30) as resp:
    remote_content = resp.read().decode('utf-8')

remote_rules = set()
for line in remote_content.splitlines():
    line = line.strip()
    if not line or line.startswith('#'):
        continue
    remote_rules.add(line)

all_local_rules = set()
for fpath in RULE_FILES:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    for m in re.finditer(r'^  - (.+)$', content, re.MULTILINE):
        rule = m.group(1).split('#')[0].strip()
        if rule:
            all_local_rules.add(rule)

missing = sorted(remote_rules - all_local_rules)

# === 过滤掉非 AI 相关的规则 ===
skip_keywords = [
    'time.', 'ntp.', 'pool.ntp', 'utcnist', 'ut1-', 's2csntp',
    'apple-relay',  # 已在 Apple Intelligence 区块
]

def is_ai_related(rule):
    for kw in skip_keywords:
        if kw.lower() in rule.lower():
            return False
    return True

ai_missing = [r for r in missing if is_ai_related(r)]
skipped = [r for r in missing if not is_ai_related(r)]

print(f'总缺失: {len(missing)}')
print(f'AI相关: {len(ai_missing)} (将添加)')
print(f'跳过(非AI): {len(skipped)} (NTP/时间服务等)')
print()

# === 分类 ===
categories = {
    'anthropic_claude': [],
    'openai_chatgpt': [],
    'coze_cici_bytedance': [],
    'google_gemini': [],
    'meta_ai': [],
    'microsoft_copilot_azure': [],
    'mistral_perplexity_poe_xai': [],
    'adobe_canva_design': [],
    'dev_tools_ide_browser': [],
    'api_providers': [],
    'ai_apps_other': [],
}

keywords_map = {
    'anthropic_claude': ['clau.de', 'claude', 'anthropic', 'datadog', 'sift'],
    'openai_chatgpt': ['openai', 'chatgpt', 'dalle.com', 'oai', 'workos', 'sentry.io', 'humb.apple'],
    'coze_cici_bytedance': ['coze', 'cici', 'dola', 'byted', 'byteoversea', 'yhgfb', 'itobsns',
                            'appsflyer', 'oceanapi', 'pipopay', 'ttwstatic', 'byteintlapi'],
    'google_gemini': ['gemini', 'googleapis', 'gstatic', 'ggpht', 'ytimg',
                      'doubleclick', 'googletagmanager', 'google-analytics', 'antigravity',
                      'aida.goo', 'open-vsx', 'exp-tas', 'cloudcode-pa', 'opal.',
                      'learnyourway', 'stax.withgoogle', 'csp.withgoogle', 'colab',
                      'firebase.studio', 'notebooklm.goog', 'jules.google', 'withgoogle',
                      'autodraw', 'secretmanager.goog', 'aiplatform.goog',
                      'cloudacompanion.goog', 'lcontent-', 'ipv4.google', 'clients6.',
                      'clients4.', 'h3.google', 'ogs.google', 'g.ai', 'ai.google',
                      'fonts.googleapis', 'fonts.gstatic', 'ssl.gstatic', 'maps.gstatic',
                      'oauth2.googleapis', 'content-autofill', 'speech.googleapis',
                      'www.googleapis', 'www.googletagmanager', 'maps.googleapis',
                      'googleads.g', 'static.doubleclick', 'td.doubleclick',
                      'labs.google'],  # 注意：不含纯 google.com 避免误匹配
    'meta_ai': ['meta.com/ai', 'meta.com/imagine', 'llama.com', 'imagine.meta'],
    'microsoft_copilot_azure': ['copilot.cloud.microsoft', 'copilotstudio.microsoft',
                                 'm365copilot', 'msunlimitedcloudsummit', 'microsoftcloudsummit',
                                 'cortana.ai', 'githubcopilot.com', 'playwright.azureedge',
                                 'search.windows.net', 'inference.ml.azure', 'azureml.ms',
                                 'customtranslator.azure', 'cognitiveservices.azure',
                                 'api.cognitive.microsoft', 'api.cognitive.azure',
                                 'stt.speech.azure'],
    'mistral_perplexity_poe_xai': ['mistral.ai/console', 'perplexity-ai.cloudflareaccess',
                                    'pplx-res.cloudinary', 'perplexity.ai', 'pplx.ai',
                                    'poecdn.net', 'api.x.ai', 'xai.chronosphere',
                                    'hyperbolic'],
    'adobe_canva_design': ['adobe.com/clio', 'dc-genai.adobe', 'firefly-api.adobe',
                            'sensei.adobe', 'canva.site', 'canva.dev', 'canva.com',
                            'zeetings.com', 'smartmockups.com', 'fal.ai'],
    'dev_tools_ide_browser': ['trae-api-sg.mchost.guru', 'trae.ai', 'traeapi.us',
                              'factory.ai', 'api.jetbrains.ai', 'jetbrains.ai',
                              'vercel.com', 'vercel.sh', 'ethyca.com', 'zed.dev',
                              'codebuddy.ai', 'kiro.dev', 'devv.ai', 'devv.featurebase',
                              'arc.net', 'diabrowser.engineering', 'deta.space',
                              'deta.surf', 'strawberrybucket.xyz', 'strawberrybrowserapi'],
    'api_providers': ['openrouter.ai', 'together.ai', 'jina.ai', 'api.hyperbolic.xyz',
                      'hyperbolic.ai'],
}

for rule in ai_missing:
    matched = False
    for cat, kws in keywords_map.items():
        for kw in kws:
            if kw.lower() in rule.lower():
                categories[cat].append(rule)
                matched = True
                break
        if matched:
            break
    if not matched:
        categories['ai_apps_other'].append(rule)

# 输出结果（用于插入到 yaml）
for cat, rules in categories.items():
    if rules:
        print(f'# --- {cat} ({len(rules)}) ---')
        for r in rules:
            print(r)
        print()
