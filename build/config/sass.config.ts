/**
 * 所有走了loader的sccs文件头部均会自动注入下列代码
 */
export const additionalData = ` 
@use 'sass:math';
@use "@/styles/_variables.module.scss" as *;
@use "@/styles/_mixins.scss" as *;
@use "@/assets/images/sprites/main/_spritesmith/main.scss" as *;
`
