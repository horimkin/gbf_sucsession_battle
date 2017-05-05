var startR  =  5;
var nowC    = 10; //J列
var idC     = 11; //K列
var persons = 30;
var setid   = "K2";

function forward() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var id = "";
  
  //"→"を探索
  var i = 0;
  for(; i < persons; i++){
    if(sheet.getRange(startR + i, nowC).getValue() != ""){
      break;
    }
  }
  
  if(i >= persons){
    //"→"が見つからなかった場合(初期状態を想定)
    //1番目に"→"を設定
    sheet.getRange(startR, nowC).setValue("→");
    id = sheet.getRange(startR, idC).getValue();

  }else if(i == persons -1){
    //リセット
    sheet.getRange(startR + i, nowC).setValue("");
    id = "";

  }else{
    sheet.getRange(startR + i, nowC).setValue("");
    sheet.getRange(startR + i + 1, nowC).setValue("→");
    id = sheet.getRange(startR + i + 1, idC).getValue();

  }
  
  //救援ID書き込み
  sheet.getRange(setid).setValue(id);
}

//ミスったとき用に戻るも実装
function back() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  //"→"を探索
  var i = 0;
  for(; i < persons; i++){
    if(sheet.getRange(startR + i, nowC).getValue() != ""){
      break;
    }
  }
  
  if(i >= persons){
    //"→"が見つからなかった場合(初期状態を想定)
    //1番目に"→"を設定
    sheet.getRange(startR, nowC).setValue("→");
    id = sheet.getRange(startR, nowC + 1).getValue();
    
  }else if(i == 0){
    //リセット
    sheet.getRange(startR + i, nowC).setValue("");
    id = "";

  }else{
    sheet.getRange(startR + i, nowC).setValue("");
    sheet.getRange(startR + i - 1, nowC).setValue("→");
    id = sheet.getRange(startR + i - 1, idC).getValue();
  }
  
  //救援ID書き込み
  sheet.getRange(setid).setValue(id);
}



//何かしら更新されたときに自動で実行される
//たぶん↑の処理でセルを書き換えたときにも実行されちゃってる？
function onEdit() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  //"→"を探索
  var i = 0;
  for(; i < persons; i++){
    if(sheet.getRange(startR + i, nowC).getValue() != ""){
      break;
    }
  }
  
  if(i >= persons){
    //"→"が見つからなかった場合(初期状態を想定)
    //なにもしない
    
  }else{
    id = sheet.getRange(startR + i, idC).getValue();
    
    //救援ID書き込み
    sheet.getRange(setid).setValue(id);
  }
  
}
