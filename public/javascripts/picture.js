!function(n){var r={};function a(t){if(r[t])return r[t].exports;var e=r[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,a),e.l=!0,e.exports}a.m=n,a.c=r,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=10)}({10:function(t,e){var n=document.location.href.split("/pictures/")[1].split("#")[0];function r(t,e,n){$.ajax({url:t,type:n,data:e})}$(document).ready(function(){$("#modalDelete").click(function(){r("/pictures/deletePicture",{id:n},"POST"),setTimeout(function(){document.location.href="/pictures"},400)}),$("#__save").click(function(){r("/pictures/renamePicture",{id:n,name:$("#changeName").val(),author:$("#changeAuthor").val(),date:$("#changeYear").val(),description:$("#changeDes").val(),inAuction:null,beginning_price:$("#changePrice_").val(),min_step:$("#changeMin_").val(),max_step:$("#changeMax_").val()},"PUT"),$("#td1").text($("#changeName").val()),$("#td2").text($("#changeAuthor").val()),$("#td3").text($("#changeYear").val()),$("#td4").text($("#changeDes").val()),""!=$("#changePrice_").val()&&($("#td5").text("Да"),$("#td6").text($("#changePrice_").val()),$("#td7").text($("#changeMin_").val()),$("#td8").text($("#changeMax_").val()))}),$("#save").click(function(){r("/pictures/addInAuction",{id:n,inAuction:!0,beginning_price:$("#changePrice").val(),min_step:$("#changeMin").val(),max_step:$("#changeMax").val()},"PUT"),$("#addAuction").text("Удалить из аукциона"),$("#addAuction").attr({form:"removePicFromAuc",href:"#modalRemovePic"}),$("#tab tr:last").after('<tr id="tr5"><td>В аукционе?<td id="td5">Да</tr><tr id="tr6"><td>Начальная цена<td id="td6">'+$("#changePrice").val()+'</tr><tr id="tr7"><td>Мин. шаг<td id="td7">'+$("#changeMin").val()+'</tr><tr id="tr8"><td>Макс. шаг<td id="td8">'+$("#changeMax").val()+"</tr>")}),$("#removePicButton").click(function(){r("/pictures/removeFromAuction",{id:n},"PUT"),$("#tr5").remove(),$("#tr6").remove(),$("#tr7").remove(),$("#tr8").remove(),$("#addAuction").text("Поставить в аукцион"),$("#addAuction").attr({form:"addPicToAuc",href:"#modalAddPic"})})})}});