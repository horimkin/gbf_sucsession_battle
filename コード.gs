startR  = 6;
nowC    = 9; //矢印
idC     = 10; //ID
idbkC   = 11; //IDバックアップ
nameC   = 4;  //プレイヤー名
persons = 30; //矢印の移動数．人数＋α

spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
sheet       = spreadsheet.getSheetByName("メイン")
worksheet   = spreadsheet.getSheetByName("作業用")
idAndNameRange = worksheet.getRange(1,2,2,2);
countRange     = worksheet.getRange(3,2);

function resetAll(){
  resetIdAndName();
  resetNowBattle();
}

function resetIdAndName(){
  idAndNameRange.setValue("");
}

function resetNowBattle(){
  if(getNowBattle()){
    sheet.getRange(getNowBattle(), nowC).setValue("");
  }
  countRange.setValue("");
}

function setIdAndName(id_and_name){
  idAndNameRange.setValues(id_and_name);
}

function getIdAndName(row, add){
  //ID欄とIDバックアップ欄に記載がなければ人数不足としてadd分前後を取得
  if(row < startR || startR + persons <= row){
    return {row: 0, id: "", name: ""};
  }

  var id = sheet.getRange(row, idC).getValue();
  var id_bk = sheet.getRange(row, idbkC).getValue();
  if(id && id_bk && id == id_bk){
    return {row: row, id: id, name: sheet.getRange(row, nameC).getValue()};
  }
  if(id_bk){
    return {row: row, id: id_bk, name: sheet.getRange(row, nameC).getValue()};
  }
  if(add == 0){
    return {row: row, id: "", name: sheet.getRange(row, nameC).getValue()};
  }
  
  return getIdAndName(row + add, add);
}

function getNowBattle(){
  if(getNowBattle.now){
  }else{
    getNowBattle.now = countRange.getValue()
  }
  return(getNowBattle.now);
}

function moveNowBattle(next){ 
  var now = getNowBattle();
  if(now){
    sheet.getRange(now, nowC).setValue("");
  }
  sheet.getRange(next, nowC).setValue("→");
  countRange.setValue(next);
}

function forward() {
  var id_and_name;  
  var now = getNowBattle();
  var next;
  
  if(now == startR + persons - 1){
    resetIdAndName();
    resetNowBattle();

  }else{
    if(now == 0){
      next = startR;
      
    }
    else{
      next = now + 1;
      
    }
    
    var info      = getIdAndName(next, 1);
    var info_next = getIdAndName(info.row + 1, 1);
    
    id_and_name = [[info.id, info.name],
                   [info_next.id, info_next.name]
                  ];

    setIdAndName(id_and_name);
    moveNowBattle(info.row);
    
  }
}

function back() {
  var id_and_name;
  var info;
  var info_next;
  var now = getNowBattle();
  
  if(now == startR){
    resetNowBattle();
    resetIdAndName();
    
  }else{
    if(now == 0){
      info_next = getIdAndName(startR + persons);      
      info = getIdAndName(startR + persons - 1, -1);
    }
    else{
      info_next = getIdAndName(now, -1);
      info = getIdAndName(info_next.row - 1, -1);
    }

    id_and_name = [[info.id, info.name],
                   [info_next.id, info_next.name]
                  ];

    setIdAndName(id_and_name);
    moveNowBattle(info.row);
        
  }
}

function onEdit() {
  
  var now = getNowBattle();
  
  if(now){
    var info      = getIdAndName(now, 1);
    var info_next = getIdAndName(info.row + 1, 1);
    var id_and_name = [[info.id,info.name],
                       [info_next.id, info_next.name]
                      ];

    setIdAndName(id_and_name);
  }
}

function onOpen(){
  
  var menus = [{name:'進む',functionName:'forward'},
               {name:'戻る',functionName:'back'},
               {name:'リセット',functionName:'resetAll'}
             ];
               
  spreadsheet.addMenu('ID移動',menus);
}