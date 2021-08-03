export const generateNode = () => {
  var text = "";
  var characters = "abcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < 2; i++) {
    text += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  const daysFromPivot = Math.round(Math.random() * 100);
  const randomSign = Math.random() < 0.5 ? -1 : 1;
  return { text, daysFromPivot: daysFromPivot * randomSign, drawArrow: true };
};
