/*:
 * @plugindesc This plugin allows you to filter whether the sprite works fine before starting the current frame in the combat. <RS_VerifyChildSprite>
 * @author biud436
 * @help
 * 2018.01.05 (v1.0.0) - First Release.
 */
/*:ko
 * @plugindesc 전투에서 현재 프레임이 시작되기 전에 스프라이트가 제대로인지 필터링합니다. <RS_VerifyChildSprite>
 * @author biud436
 * @help
 * 2018.01.05 (v1.0.0) - First Release. 
 */ 
 
var Imported = Imported || {};
Imported.RS_VerifyChildSprite = true;
 
(function() {
  var alias_Spriteset_Battle_update = Spriteset_Battle.prototype.update;
  Spriteset_Battle.prototype.update = function() {
    
    // 현재 프레임이 시작되기 전에 스프라이트를 검증하여 스프라이트가 아니면 없애 버립니다.
    var item = this.children;
    this.children = item.filter(function(i) {
      if(i && i instanceof Sprite) return i;
    }, this);
    
    alias_Spriteset_Battle_update.call(this);
  };  
})();
