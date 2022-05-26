// index.js
Page({
  data:{
      input:""
  },
  onclick:function(e){
    var id = e.target.id;
    if(id == "c12") this.setData({input: this.data.input + "7" });
    if(id == "c13") this.setData({input: this.data.input + "4" });
    if(id == "c14") this.setData({input: this.data.input + "1" });
    if(id == "c22") this.setData({input: this.data.input + "8" });
    if(id == "c23") this.setData({input: this.data.input + "5" });
    if(id == "c24") this.setData({input: this.data.input + "2" });
    if(id == "c25") this.setData({input: this.data.input + "0" });
    if(id == "c32") this.setData({input: this.data.input + "9" });
    if(id == "c33") this.setData({input: this.data.input + "6" });
    if(id == "c34") this.setData({input: this.data.input + "3" });
    if(id == "c35") this.setData({input: this.data.input + "." });
    if(id == "c21") this.setData({input: this.data.input + "÷" });
    if(id == "c31") this.setData({input: this.data.input + "x" });
    if(id == "c42") this.setData({input: this.data.input + "-" });
    if(id == "c43") this.setData({input: this.data.input + "+" });
    if(id == "c15") this.setData({input: this.data.input + "%" });
  },
  reset:function(){
    this.setData({input:""});
  },
  delete:function(){
    var s = this.data.input.substr(0,this.data.input.length - 1);
    this.setData({input:s});
  },
  priority:function(e){
    if(e == "#")  return 0;
    if(e == "+" || e == "-")  return 1;
    if(e == "x" || e == "÷")  return 2;
    if(e == "%")  return 3;
  },
  getsum:function(x, y, z){
    if(z == "+")  return String(parseFloat(x) + parseFloat(y));
    if(z == "-")  return String(parseFloat(x) - parseFloat(y));
    if(z == "x")  return String(parseFloat(x) * parseFloat(y));
    if(z == "÷")  return String(parseFloat(x) / parseFloat(y));
    if(z == "%")  return String(parseFloat(x) % parseFloat(y));
  },
  equal:function(){
    var index = 0;
    var length = 0;
    var op = new Array();
    var obj = new Array();
    var input = this.data.input;
    op.push("#");
    for(var i = 0; i < input.length; i++){
      if(input[i] >= "0" && input[i] <= "9" || input[i] == "."){
        length++;
      }else{
        var cur = input.substr(index,length);
        if(this.priority(op[op.length - 1]) <= this.priority(input.substr(i,1))) op.push(input.substr(i,1));
        else{
          cur = this.getsum(obj[obj.length - 1], cur, input.substr(i,1));
        }
        obj.push(cur);
        index += length + 1;
        length = 0;
      }
    }
    obj.push(input.substr(index,length));
    while(op[op.length - 1] != "#"){
      var cur = obj[obj.length - 1];
      obj.pop();
      var pre = obj[obj.length - 1];
      obj.pop();
      obj.push(this.getsum(pre, cur, op[op.length - 1]));
      op.pop();
    }
    this.setData({input:this.data.input + "=" + obj[obj.length - 1]});
    this.data.input = obj[obj.length - 1];
    // for(var i = 0; i < this.data.obj.length; i++){
    //   console.log(obj[i]);
    // }
    // for(var i = 0; i < this.data.op.length; i++){
    //   console.log(op[i]);
    // }
  }
})
