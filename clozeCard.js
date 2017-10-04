function clozeCard(text,cloze){
  this.text = text;
  if(text.includes(cloze)){
    this.partialText = text.replace(cloze, " ... ");
  }else{
    console.log("Cloze does not exist in sentence");
  }
  this.cloze = cloze;
}

module.exports = clozeCard;