function changeOrder(classOrder, targetParent) {
  const elements = {};
  classOrder.forEach(x => (elements[x] = document.getElementsByClassName(x)));
  console.log("ORDER", elements);
}

export default changeOrder;
