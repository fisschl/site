/**
 * 分页
 */
export interface Page {
  page: number; // 当前页码
  size: number; // 每页的记录数
  total?: number; // 总记录数
}
