// 设置页面画布 Canvas
export const createCanvas = (w = "100%", h = "100%") => {
  document.documentElement.style["overflow"] = "hidden";
  document.documentElement.style.overflow = "hidden";
  document.documentElement.style.width = "100%";
  document.documentElement.style.height = "100%";
  document.documentElement.style.margin = "0";
  document.documentElement.style.padding = "0";
  document.body.style.overflow = "hidden";
  document.body.style.width = "100%";
  document.body.style.height = "100%";
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  const canvas = document.createElement("canvas");
  canvas.style.width = w;
  canvas.style.height = h;
  canvas.id = "gameCanvas";
  document.body.appendChild(canvas);
  return canvas;
}