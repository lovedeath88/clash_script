function main(config) {

  // ====================== 基础配置（零爆红·防封） ======================
  config["ipv6"] = false;
  config["global-client-fingerprint"] = "chrome";
  config["geodata-mode"] = true;

  // TUN模式（必须开启）
  if (!config["tun"]) config["tun"] = {};
  config["tun"]["enable"] = true;
  config["tun"]["stack"] = "mixed";
  config["tun"]["dns-hijack"] = ["any:53"];
  config["tun"]["strict-route"] = false;
  config["tun"]["auto-route"] = true;
  config["tun"]["auto-detect-interface"] = true;

  // 防泄漏配置 + 满血 DNS
  if (!config["dns"]) config["dns"] = {};
  config["dns"]["enable"] = true;
  config["dns"]["listen"] = "0.0.0.0:53";
  config["dns"]["ipv6"] = false;
  config["dns"]["enhanced-mode"] = "fake-ip";
  config["dns"]["fake-ip-range"] = "198.18.0.1/16";
  config["dns"]["fake-ip-filter-mode"] = "blacklist";
  config["dns"]["fake-ip-filter"] = ["stun.*.*","stun.l.google.com","+.lan","+.local","+.*"];
  config["dns"]["default-nameserver"] = ["223.5.5.5","114.114.114.114","1.1.1.1"];
  config["dns"]["nameserver"] = ["https://doh.pub/dns-query","https://dns.alidns.com/dns-query","https://doh.dns.sb/dns-query"];
  config["dns"]["fallback"] = ["https://doh.dns.sb/dns-query","https://dns.cloudflare.com/dns-query","https://dns.twnic.tw/dns-query"];
  config["dns"]["fallback-filter"] = {"geoip": true,"geoip-code": "CN","gcid": ["www.baidu.com","www.qq.com"]};

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
      "proxies": ["🇺🇸美国测速⚡", "🇺🇸美国手动", "🇯🇵日本测速⚡", "🇯🇵日本手动", "🇹🇼台湾测速⚡", "🇹🇼台湾手动", "🇸🇬新加坡测速⚡", "🇸🇬新加坡手动", "关闭代理", "开启代理"],
      "icon": "https://raw.githubusercontent.com/lovedeath88/clash_script/master/icon/Ai.png"
    },
    {
      ...groupBaseOption,
      "name": "开启代理",
      "type": "select",
      "proxies": ["DIRECT", "🇭🇰香港测速⚡", "🇭🇰香港手动", "🇯🇵日本测速⚡", "🇯🇵日本手动", "🇰🇷韩国测速⚡", "🇺🇸美国测速⚡", "🇺🇸美国手动", "🇸🇬新加坡测速⚡", "🇹🇼台湾测速⚡", "🇹🇼台湾手动"],
      "icon": "https://raw.githubusercontent.com/lovedeath88/clash_script/master/icon/Airport.png"
    },
    {
      ...groupBaseOption,
      "name": "广告拦截",
      "type": "select",
      "proxies": ["REJECT", "关闭代理"],
      "icon": "https://raw.githubusercontent.com/lovedeath88/clash_script/master/icon/adguard.png"
    },
    {
      ...groupBaseOption,
      "name": "隐私保护",
      "type": "select",
      "proxies": ["REJECT", "关闭代理"],
      "icon": "https://raw.githubusercontent.com/lovedeath88/clash_script/master/icon/Ip.png"
    },
    {
      ...groupBaseOption,
      "name": "关闭代理",
      "type": "select",
      "proxies": ["DIRECT", "开启代理"],
      "icon": "https://raw.githubusercontent.com/lovedeath88/clash_script/master/icon/China.png"
    },
    {
      ...groupBaseOption,
      "name": "番剧出差",
      "type": "select",
      "proxies": ["关闭代理", "🇭🇰香港测速⚡"],
      "icon": "https://raw.githubusercontent.com/lovedeath88/clash_script/master/icon/bilibili.png"
    },
    {
      ...groupBaseOption,
      "name": "国内_Game",
      "type": "select",
      "proxies": ["关闭代理", "开启代理"],
      "icon": "https://raw.githubusercontent.com/lovedeath88/clash_script/master/icon/Game.png"
    },
    {
      ...groupBaseOption,
      "name": "国外_Game",
      "type": "select",
      "proxies": ["关闭代理", "开启代理", "🇭🇰香港测速⚡", "🇸🇬新加坡测速⚡"],
      "icon": "https://raw.githubusercontent.com/lovedeath88/clash_script/master/icon/Steam.png"
    },
    {
      ...groupBaseOption,
      "name": "国外网站",
      "type": "select",
      "include-all": true,
      "filter": "(?i)^(?!.*(?:HK|hk|🇭🇰|hongkong|港|JP|jp|🇯🇵|Japan|日本|KR|kr|🇰🇷|korea|韩国|TW|tw|🇹🇼|Taiwan|台湾|US|us|🇺🇸|America|美国|SG|sg|🇸🇬|singapore|新加坡|🏷|t\\.me)).*",
      "proxies": ["开启代理", "关闭代理"],
      "icon": "https://raw.githubusercontent.com/lovedeath88/clash_script/master/icon/GitHub.png"
    },
    {
      ...groupBaseOption,
      "name": "黑白名单",
      "type": "select",
      "proxies": ["开启代理", "关闭代理", "🇭🇰香港测速⚡"],
      "icon": "https://raw.githubusercontent.com/lovedeath88/clash_script/master/icon/Select.png"
    },
    // 自动选择代理组（隐藏，仅用于分流）
    {
      ...groupBaseOption,
      "name": "🇭🇰香港测速⚡",
      "type": "url-test",
      "hidden": true,
      "include-all": true,
      "filter": "(?i)^(?=.*(?:HK|hk|🇭🇰|hongkong|港)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇯🇵日本测速⚡",
      "type": "url-test",
      "hidden": true,
      "include-all": true,
      "filter": "(?i)^(?=.*(?:JP|jp|🇯🇵|Japan|日本)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇰🇷韩国测速⚡",
      "type": "url-test",
      "hidden": true,
      "include-all": true,
      "filter": "(?i)^(?=.*(?:KR|kr|🇰🇷|korea|韩国)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇺🇸美国测速⚡",
      "type": "url-test",
      "hidden": true,
      "include-all": true,
      "filter": "(?i)^(?=.*(?:US|us|🇺🇸|America|美国)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇸🇬新加坡测速⚡",
      "type": "url-test",
      "hidden": true,
      "include-all": true,
      "filter": "(?i)^(?=.*(?:SG|sg|🇸🇬|singapore|新加坡)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇹🇼台湾测速⚡",
      "type": "url-test",
      "hidden": true,
      "include-all": true,
      "filter": "(?i)^(?=.*(?:TW|tw|🇹🇼|Taiwan|台湾)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇭🇰香港手动",
      "type": "select",
      "include-all": true,
      "hidden": false,
      "filter": "(?i)^(?=.*(?:HK|hk|🇭🇰|hongkong|港)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇺🇸美国手动",
      "type": "select",
      "include-all": true,
      "hidden": false,
      "filter": "(?i)^(?=.*(?:US|us|🇺🇸|America|美国)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇯🇵日本手动",
      "type": "select",
      "include-all": true,
      "hidden": false,
      "filter": "(?i)^(?=.*(?:JP|jp|🇯🇵|Japan|日本)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇹🇼台湾手动",
      "type": "select",
      "include-all": true,
      "hidden": false,
      "filter": "(?i)^(?=.*(?:TW|tw|🇹🇼|Taiwan|台湾)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇸🇬新加坡手动",
      "type": "select",
      "include-all": true,
      "hidden": false,
      "filter": "(?i)^(?=.*(?:SG|sg|🇸🇬|singapore|新加坡)).*$"
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

  // 规则列表（按优先级排序）
  const rules = [
    "DOMAIN-SUFFIX,raw.githubusercontent.com,开启代理",
    "RULE-SET,Baa_System,DIRECT,no-resolve",
    "RULE-SET,reject,广告拦截",
    "RULE-SET,Privacy,隐私保护",
    "RULE-SET,Baa_CN,关闭代理",
    "RULE-SET,Baa_USA,开启代理",
    "RULE-SET,Baa_Agent,Ai智能",
    "RULE-SET,BilibiliHMT,番剧出差",
    "RULE-SET,SteamCN,国内_Game",
    "RULE-SET,Epic,国内_Game",
    "RULE-SET,Game,国外_Game",
    "RULE-SET,applications,关闭代理,no-resolve",
    "RULE-SET,Proxy,开启代理",
    "RULE-SET,GFW,开启代理",
    "RULE-SET,telegramcidr,开启代理",
    "RULE-SET,cncidr,关闭代理,no-resolve",
    "RULE-SET,direct,关闭代理,no-resolve",
    "RULE-SET,tld-not-cn,关闭代理,no-resolve",
    "GEOIP,LAN,关闭代理,no-resolve",
    "GEOSITE,CN,关闭代理,no-resolve",
    "GEOIP,CN,关闭代理",
    "AND,((NETWORK,UDP),(DST-PORT,443)),REJECT",
    "MATCH,黑白名单"
  ];

  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;
  return config;
}