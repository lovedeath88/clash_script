function main(config) {

  // ====================== 基础配置（零爆红·防封） ======================
  config["ipv6"] = false;
  config["global-client-fingerprint"] = "chrome";
  config["geodata-mode"] = true;

  // TUN模式（必须开启）
  if (!config["tun"]) config["tun"] = {};
  config["tun"]["enable"] = true;
  config["tun"]["stack"] = "system";
  config["tun"]["dns-hijack"] = ["any:53"];
  config["tun"]["strict-route"] = false;
  config["tun"]["auto-route"] = true;
  config["tun"]["auto-detect-interface"] = true;

  // 防泄漏配置
  if (!config["dns"]) config["dns"] = {};
  config["dns"]["fake-ip-filter"] = ["stun.*.*","stun.l.google.com","+.lan","+.local"];

  if (!config["rules"]) config["rules"] = [];

  // ====================== 代理组配置 ======================
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
      "proxies": ["关闭代理", "开启代理", "🇺🇸美国测速⚡", "🇺🇸美国手动"],
      "icon": "https://raw.githubusercontent.com/Aworld00/Clash/refs/heads/main/Icon/America.png"
    },
    {
      ...groupBaseOption,
      "name": "开启代理",
      "type": "select",
      "proxies": ["DIRECT", "🇭🇰香港测速⚡", "🇯🇵日本测速⚡", "🇰🇷韩国测速⚡", "🇺🇸美国测速⚡", "🇸🇬新加坡测速⚡", "🇹🇼台湾测速⚡", "🇭🇰香港手动", "🇺🇸美国手动", "🇯🇵日本手动", "🇹🇼台湾手动"],
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
    // 自动选择代理组（隐藏，仅用于分流）
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

  // 规则集通用配置（统一更新频率与格式）
  const ruleProviderCommon = {
    "type": "http",
    "format": "yaml",
    "interval": 86400,
    "user-agent": "Clash/1.17.0"
  };

  // 规则集配置
  const ruleProviders = {
    "reject": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
      "path": "./ruleset/loyalsoldier/reject.yaml"
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
      "url": "https://fastly.jsdelivr.net/gh/Aworld00/ACL4SSR@master/Clash/Providers/Ruleset/BilibiliHMT.yaml",
      "path": "./ruleset/ACL4SSR/BilibiliHMT.yaml"
    },
    "LAN": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://cdn.jsdelivr.net/gh/Aworld00/ACL4SSR@refs/heads/master/Clash/Providers/LocalAreaNetwork.yaml",
      "path": "./ruleset/ACL4SSR/LAN.yaml"
    },
    "Baa_CN": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/lovedeath88/clash_script/refs/heads/main/Rules/Baa_CN.yaml",
      "path": "./Rules/Baa_CN.yaml"
    },
    "Baa_Agent": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/lovedeath88/clash_script/refs/heads/main/Rules/Baa_Agent.yaml",
      "path": "./Rules/Baa_Agent.yaml"
    },
    "Baa_USA": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/lovedeath88/clash_script/refs/heads/main/Rules/Baa_USA.yaml",
      "path": "./Rules/Baa_USA.yaml"
    },
  };

  // 规则列表（按优先级排序）
  const rules = [
    "DOMAIN-SUFFIX,local,DIRECT",
    "IP-CIDR,127.0.0.0/8,DIRECT,no-resolve",
    "IP-CIDR,192.168.0.0/16,DIRECT,no-resolve",
    "IP-CIDR,10.0.0.0/8,DIRECT,no-resolve",
    "IP-CIDR,172.16.0.0/12,DIRECT,no-resolve",
    "IP-CIDR,100.64.0.0/10,DIRECT,no-resolve",
    "IP-CIDR6,::1/128,DIRECT,no-resolve",
    "IP-CIDR6,fc00::/7,DIRECT,no-resolve",
    "IP-CIDR6,fe80::/10,DIRECT,no-resolve",
    "IP-CIDR6,fd00::/8,DIRECT,no-resolve",
    "DST-PORT,3478,REJECT,no-resolve",
    "DST-PORT,19302,REJECT,no-resolve",
    "DST-PORT,3479,REJECT,no-resolve",
    "DST-PORT,19305,REJECT,no-resolve",
    "DOMAIN-SUFFIX,raw.githubusercontent.com,开启代理",
    "RULE-SET,Baa_USA,Ai智能",
    "RULE-SET,BilibiliHMT,番剧出差",
    "RULE-SET,Privacy,隐私保护",
    "RULE-SET,SteamCN,国内_Game",
    "RULE-SET,Epic,国内_Game",
    "RULE-SET,Game,国外_Game",
    "RULE-SET,Baa_CN,关闭代理",
    "RULE-SET,Baa_Agent,国外网站",
    "RULE-SET,reject,广告拦截",
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