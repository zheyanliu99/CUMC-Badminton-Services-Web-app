export interface ArticleListConfig {
  label: string;
  mypost: boolean
  limit: number
  // offset?: number,
  page: number
  sort: string
};

export interface ConfigResp {
  label: number;
  mypost: number
  limit: number
  // offset?: number,
  page: number
  sort: number
};

function getKey(object, value) {
  return Number(Object.keys(object).find(key => object[key] === value));
};

const labels = {
  1: "Administrative",
  2: "Lost and Found",
  3: "Call for Partners",
  4: "Others",
  5: "All Posts"
};
const myposts = {
  0: false,
  1: true
};
const sorts = {
  1: "recent",
  2: "popular",
  3: "relevant"
};

export function resp2config(resp: ConfigResp) {
  var config: ArticleListConfig = {
    label: labels[resp.label],
    mypost: myposts[resp.mypost],
    limit: resp.limit,
    page: resp.page,
    sort: sorts[resp.sort]
  }
  return config
};

export function config2resp(config: ArticleListConfig) {
  var resp: ConfigResp = {
    label: getKey(labels,config.label),
    mypost: getKey(myposts,config.mypost),
    limit: config.limit,
    page: config.page,
    sort: getKey(sorts,config.sort)
  }
  return resp
};
