// src/data/taxonomy.ts

export type PrimaryCategory = '政治' | '军事' | '经济' | '文化' | '科技' | '社会' | '世界史';

// 定义层级关系 (父类 -> 子类列表)
export const CATEGORY_TREE: Record<PrimaryCategory, string[]> = {
  '政治': ['政变', '更迭', '改革', '统一', '建国', '外交', '终结', '危机', '盛世', '政治'],
  '军事': ['战争', '起义', '民变', '动乱', '革命', '征服', '军事'],
  '文化': ['宗教', '思想', '艺术', '文学', '文化'],
  '科技': ['探险', '发明', '工程', '科技'],
  '经济': ['贸易', '赋税', '经济'],
  '社会': ['灾难', '瘟疫', '社会'],
  '世界史': ['世界史'] // 特殊分类
};

// 反向查找表（子类 -> 父类）
// 例如: getPrimaryCategory('政变') -> '政治'
export const SUB_TO_PRIMARY: Record<string, PrimaryCategory> = {};

// 初始化反向查找表
Object.entries(CATEGORY_TREE).forEach(([parent, children]) => {
  children.forEach(child => {
    SUB_TO_PRIMARY[child] = parent as PrimaryCategory;
  });
});

/**
 * 获取某个类型的父级分类
 * 如果找不到，默认归为 '社会' 或原值
 */
export function getPrimaryCategory(subtype: string): PrimaryCategory | '其他' {
  return SUB_TO_PRIMARY[subtype] || '其他';
}

/**
 * 定义每个父分类的颜色主题
 */
export const CATEGORY_COLORS: Record<PrimaryCategory | '其他', string> = {
  '政治': 'red',     // 权力、变动
  '军事': 'orange',  // 冲突、战火
  '经济': 'yellow',  // 财富、金色
  '文化': 'purple',  // 典雅、深沉
  '科技': 'blue',    // 理性、未来
  '社会': 'gray',    // 民生、基调
  '世界史': 'cyan',  // 广阔
  '其他': 'gray'
};
