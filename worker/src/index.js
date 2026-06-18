import yaml from 'js-yaml';

function main(config) {

  config["ipv6"] = false;
  config["mixed-port"] = 7897;
  config["global-client-fingerprint"] = "chrome";
  config["geodata-mode"] = true;

  if (!config["tun"]) config["tun"] = {};
  config["tun"]["enable"] = true;
  config["tun"]["stack"] = "system";
  config["tun"]["dns-hijack"] = ["any:53"];
  config["tun"]["strict-route"] = false;
  config["tun"]["auto-route"] = true;
  config["tun"]["auto-detect-interface"] = true;

  if (!config["dns"]) config["dns"] = {};
  config["dns"]["fake-ip-filter"] = ["stun.*.*","stun.l.google.com","+.lan","+.local"];

  if (!config["rules"]) config["rules"] = [];

  const groupBaseOption = {
    "interval": 180,
    "timeout": 3000,
    "url": "https://www.google.com/generate_204",
    "lazy": true,
    "max-failed-times": 3,
    "hidden": false,
  };

  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "Ai智能",
      "type": "select",
      "include-all": true,
      "filter": "(?i)^(?=.*(?:US|us|🇺🇸|America|美国))(?!.*(?:倍|流量|x)).*$",
      "proxies": ["🇺🇸美国测速⚡", "关闭代理", "开启代理", "🇯🇵日本手动", "🇹🇼台湾手动"],
      "icon": "https://raw.githubusercontent.com/lovedeath88/clash_script/master/icon/Ai.png"
    },
    {
      ...groupBaseOption,
      "name": "开启代理",
      "type": "select",
      "proxies": ["DIRECT", "🇭🇰香港测速⚡", "🇭🇰香港手动", "🇯🇵日本测速⚡", "🇯🇵日本手动", "🇰🇷韩国测速⚡", "🇺🇸美国测速⚡", "🇺🇸美国手动", "🇸🇬新加坡测速⚡", "🇹🇼台湾测速⚡", "🇹🇼台湾手动"],
      "icon": "https://github.com/Aworld00/Clash_Parsers/raw/master/Icon/Airport.png"
    },
    {
      ...groupBaseOption,
      "name": "广告拦截",
      "type": "select",
      "proxies": ["REJECT", "关闭代理"],
      "icon": "https://github.com/Aworld00/Clash_Parsers/raw/master/Icon/adguard.png"
    },
    {
      ...groupBaseOption,
      "name": "隐私保护",
      "type": "select",
      "proxies": ["REJECT", "关闭代理"],
      "icon": "https://github.com/Aworld00/Clash_Parsers/raw/master/Icon/Ip.png"
    },
    {
      ...groupBaseOption,
      "name": "关闭代理",
      "type": "select",
      "proxies": ["DIRECT", "开启代理"],
      "icon": "https://github.com/Aworld00/Clash_Parsers/raw/master/Icon/China.png"
    },
    {
      ...groupBaseOption,
      "name": "番剧出差",
      "type": "select",
      "proxies": ["关闭代理", "🇭🇰香港测速⚡"],
      "icon": "https://github.com/Aworld00/Clash_Parsers/raw/master/Icon/bilibili.png"
    },
    {
      ...groupBaseOption,
      "name": "国内_Game",
      "type": "select",
      "proxies": ["关闭代理", "开启代理"],
      "icon": "https://github.com/Aworld00/Clash_Parsers/raw/master/Icon/Game.png"
    },
    {
      ...groupBaseOption,
      "name": "国外_Game",
      "type": "select",
      "proxies": ["关闭代理", "开启代理", "🇭🇰香港测速⚡", "🇸🇬新加坡测速⚡"],
      "icon": "https://github.com/Aworld00/Clash_Parsers/raw/master/Icon/Steam.png"
    },
    {
      ...groupBaseOption,
      "name": "国外网站",
      "type": "select",
      "include-all": true,
      "filter": "(?i)^(?!.*(?:HK|hk|🇭🇰|hongkong|港|JP|jp|🇯🇵|Japan|日本|KR|kr|🇰🇷|korea|韩国|TW|tw|🇹🇼|Taiwan|台湾|US|us|🇺🇸|America|美国|SG|sg|🇸🇬|singapore|新加坡|🏷|t\\.me)).*",
      "proxies": ["开启代理", "关闭代理"],
      "icon": "https://github.com/Aworld00/Clash_Parsers/raw/master/Icon/GitHub.png"
    },
    {
      ...groupBaseOption,
      "name": "黑白名单",
      "type": "select",
      "proxies": ["开启代理", "关闭代理", "🇭🇰香港测速⚡"],
      "icon": "https://github.com/Aworld00/Clash_Parsers/raw/master/Icon/Select.png"
    },
    {
      ...groupBaseOption,
      "name": "🇭🇰香港测速⚡",
      "type": "url-test",
      "hidden": true,
      "include-all": true,
      "filter": "(?i)^(?=.*(?:HK|hk|🇭🇰|hongkong|港))(?!.*(?:倍|流量|x)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇯🇵日本测速⚡",
      "type": "url-test",
      "hidden": true,
      "include-all": true,
      "filter": "(?i)^(?=.*(?:JP|jp|🇯🇵|Japan|日本))(?!.*(?:倍|流量|x)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇰🇷韩国测速⚡",
      "type": "url-test",
      "hidden": true,
      "include-all": true,
      "filter": "(?i)^(?=.*(?:KR|kr|🇰🇷|korea|韩国))(?!.*(?:倍|流量|x)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇺🇸美国测速⚡",
      "type": "url-test",
      "hidden": true,
      "include-all": true,
      "filter": "(?i)^(?=.*(?:US|us|🇺🇸|America|美国))(?!.*(?:倍|流量|x)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇸🇬新加坡测速⚡",
      "type": "url-test",
      "hidden": true,
      "include-all": true,
      "filter": "(?i)^(?=.*(?:SG|sg|🇸🇬|singapore|新加坡))(?!.*(?:倍|流量|x)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇹🇼台湾测速⚡",
      "type": "url-test",
      "hidden": true,
      "include-all": true,
      "filter": "(?i)^(?=.*(?:TW|tw|🇹🇼|Taiwan|台湾))(?!.*(?:倍|流量|x)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇭🇰香港手动",
      "type": "select",
      "include-all": true,
      "hidden": false,
      "filter": "(?i)^(?=.*(?:HK|hk|🇭🇰|hongkong|港))(?!.*(?:倍|流量|x)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇺🇸美国手动",
      "type": "select",
      "include-all": true,
      "hidden": false,
      "filter": "(?i)^(?=.*(?:US|us|🇺🇸|America|美国))(?!.*(?:倍|流量|x)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇯🇵日本手动",
      "type": "select",
      "include-all": true,
      "hidden": false,
      "filter": "(?i)^(?=.*(?:JP|jp|🇯🇵|Japan|日本))(?!.*(?:倍|流量|x)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇹🇼台湾手动",
      "type": "select",
      "include-all": true,
      "hidden": false,
      "filter": "(?i)^(?=.*(?:TW|tw|🇹🇼|Taiwan|台湾))(?!.*(?:倍|流量|x)).*$"
    },
  ];

  const ruleProviderCommon = {
    "type": "http",
    "format": "yaml",
    "interval": 86400,
    "user-agent": "Clash/1.17.0"
  };

  const ruleProviders = {
    "reject": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://raw.githubusercontent.com/privacy-protection-tools/anti-AD/master/anti-ad-clash.yaml",
      "path": "./ruleset/anti-AD/anti-ad-clash.yaml"
    },
    "applications": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
      "path": "./ruleset/loyalsoldier/applications.yaml"
    },
    "GFW": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
      "path": "./ruleset/loyalsoldier/GFW.yaml"
    },
    "Proxy": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
      "path": "./ruleset/loyalsoldier/Proxy.yaml"
    },
    "tld-not-cn": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
      "path": "./ruleset/loyalsoldier/tld-not-cn.yaml"
    },
    "telegramcidr": {
      ...ruleProviderCommon,
      "behavior": "ipcidr",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
      "path": "./ruleset/loyalsoldier/telegramcidr.yaml"
    },
    "cncidr": {
      ...ruleProviderCommon,
      "behavior": "ipcidr",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
      "path": "./ruleset/loyalsoldier/cncidr.yaml"
    },
    "direct": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
      "path": "./ruleset/loyalsoldier/direct.yaml"
    },
    "Privacy": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Privacy/Privacy_Classical.yaml",
      "path": "./ruleset/blackmatrix7/Privacy.yaml"
    },
    "Game": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Game/Game.yaml",
      "path": "./ruleset/blackmatrix7/Game.yaml"
    },
    "SteamCN": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/SteamCN/SteamCN.yaml",
      "path": "./ruleset/blackmatrix7/SteamCN.yaml"
    },
    "Epic": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Epic/Epic.yaml",
      "path": "./ruleset/blackmatrix7/Epic.yaml"
    },
    "BilibiliHMT": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "format": "text",
      "url": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/BilibiliHMT.list",
      "path": "./ruleset/ACL4SSR/BilibiliHMT.yaml"
    },
    "LAN": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "format": "text",
      "url": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/LocalAreaNetwork.list",
      "path": "./ruleset/ACL4SSR/LAN.yaml"
    },
    "Baa_CN": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/lovedeath88/clash_script/master/Rules/Baa_CN.yaml",
      "path": "./Rules/Baa_CN.yaml"
    },
    "Baa_Agent": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/lovedeath88/clash_script/master/Rules/Baa_Agent.yaml",
      "path": "./Rules/Baa_Agent.yaml"
    },
    "Baa_USA": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/lovedeath88/clash_script/master/Rules/Baa_USA.yaml",
      "path": "./Rules/Baa_USA.yaml"
    },
    "Baa_System": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/lovedeath88/clash_script/master/Rules/Baa_System.yaml",
      "path": "./Rules/Baa_System.yaml"
    },
  };

  const rules = [
    "DOMAIN-SUFFIX,raw.githubusercontent.com,开启代理",
    "RULE-SET,Baa_System,DIRECT,no-resolve",
    "RULE-SET,reject,广告拦截",
    "RULE-SET,Privacy,隐私保护",
    "RULE-SET,Baa_USA,Ai智能",
    "RULE-SET,BilibiliHMT,番剧出差",
    "RULE-SET,SteamCN,国内_Game",
    "RULE-SET,Epic,国内_Game",
    "RULE-SET,Game,国外_Game",
    "RULE-SET,Baa_CN,关闭代理",
    "RULE-SET,Baa_Agent,国外网站",
    "RULE-SET,applications,关闭代理,no-resolve",
    "RULE-SET,GFW,开启代理",
    "RULE-SET,Proxy,开启代理",
    "RULE-SET,telegramcidr,开启代理",
    "RULE-SET,cncidr,关闭代理,no-resolve",
    "RULE-SET,direct,关闭代理,no-resolve",
    "RULE-SET,tld-not-cn,关闭代理,no-resolve",
    "GEOIP,LAN,关闭代理,no-resolve",
    "GEOSITE,CN,关闭代理,no-resolve",
    "GEOIP,CN,关闭代理",
    "MATCH,黑白名单"
  ];

  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;
  return config;
}

function parseSubscription(text) {
  let decoded = text;

  try {
    const base64Test = text.replace(/\s/g, '');
    if (/^[A-Za-z0-9+/=]+$/.test(base64Test) && base64Test.length > 50) {
      const bytes = Uint8Array.from(atob(base64Test), c => c.charCodeAt(0));
      decoded = new TextDecoder().decode(bytes);
    }
  } catch {}

  try {
    const parsed = yaml.load(decoded);
    if (parsed && typeof parsed === 'object') {
      return parsed;
    }
  } catch {}

  if (decoded.includes('ss://') || decoded.includes('vmess://') || decoded.includes('trojan://') || decoded.includes('vless://')) {
    throw new Error('订阅内容是代理链接格式（ss:///vmess://等），不是 Clash YAML 格式。请使用机场提供的 Clash 订阅链接');
  }

  throw new Error('无法解析订阅内容。前200字符: ' + decoded.substring(0, 200));
}

export default {
  async fetch(request, env, ctx) {
    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405 });
    }

    const subUrl = env.SUB_URL;
    if (!subUrl) {
      return new Response('SUB_URL 未配置', { status: 500 });
    }

    try {
      const resp = await fetch(subUrl);
      if (!resp.ok) {
        return new Response(`拉取订阅失败: HTTP ${resp.status} ${resp.statusText}`, { status: 502 });
      }

      const text = await resp.text();
      if (!text || text.length < 50) {
        return new Response(`订阅内容为空或太短 (${text?.length || 0} 字节)`, { status: 502 });
      }

      let config = parseSubscription(text);

      config = main(config);

      const output = yaml.dump(config, {
        indent: 2,
        lineWidth: -1,
        noRefs: true,
        sortKeys: false,
      });

      return new Response(output, {
        headers: {
          'Content-Type': 'text/yaml; charset=utf-8',
          'Content-Disposition': 'attachment; filename="config.yaml"',
          'Cache-Control': 'no-cache',
        },
      });
    } catch (err) {
      return new Response(`转换失败: ${err.message}\n\n请检查订阅地址是否有效，或机场是否支持 Clash 订阅格式`, { status: 502 });
    }
  },
};
