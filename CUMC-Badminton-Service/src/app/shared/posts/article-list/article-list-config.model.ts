export interface ArticleListConfig {
  label: string;

  filters: {
    author?: string,
    Is_Thumbed?: string,
    limit?: number,
    offset?: number
  };
}
