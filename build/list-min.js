/**
 * @fileOverview \u5217\u8868\u6a21\u5757\u5165\u53e3\u6587\u4ef6
 * @ignore
 */(function(){var e="bui/list/";define("bui/list",["bui/common",e+"list",e+"listitem",e+"simplelist",e+"listbox"],function(t){var n=t("bui/common"),r=n.namespace("List");return n.mix(r,{List:t(e+"list"),ListItem:t(e+"listitem"),SimpleList:t(e+"simplelist"),Listbox:t(e+"listbox")}),n.mix(r,{ListItemView:r.ListItem.View,SimpleListView:r.SimpleList.View}),r})})(),define("bui/list/domlist",["bui/common"],function(e){"use strict";function s(e,t){var n=t,r=n.get("itemCls"),i=n.get("itemStatusCls");return i&&i[e]?i[e]:r+"-"+e}function u(e,n){var i=e.attributes,o=n.get("itemStatusFields"),u={};return t.each(i,function(e){var t=e.nodeName;t.indexOf(r)!==-1&&(t=t.replace(r,""),u[t]=e.nodeValue)}),u.text=$(e).text(),t.each(o,function(t,r){var i=s(r,n);$(e).hasClass(i)&&(u[t]=!0)}),u}var t=e("bui/common"),n=t.Component.UIBase.Selection,r="data-",i=t.Component.UIBase.List,o=function(){};o.ATTRS={items:{}},o.prototype={clearControl:function(){var e=this,t=e.getItemContainer(),n=e.get("itemCls");t.find("."+n).remove()},addItem:function(e,t){return this._createItem(e,t)},getItems:function(){var e=this,n=e.getAllElements(),r=[];return t.each(n,function(t){r.push(e.getItemByElement(t))}),r},updateItem:function(e){var n=this,r=n.getItems(),i=t.Array.indexOf(e,r),s=null,o;return i>=0&&(s=n.findElement(e),o=n.getItemTpl(e,i),s&&$(s).html($(o).html())),s},removeItem:function(e,t){t=t||this.findElement(e),$(t).remove()},getItemContainer:function(){return this.get("itemContainer")||this.get("el")},getItemTpl:function(e,n){var r=this,i=r.get("itemTplRender"),s=r.get("itemTpl");return i?i(e,n):t.substitute(s,e)},_createItem:function(e,t){var n=this,r=n.getItemContainer(),i=n.get("itemCls"),s=n.get("dataField"),o=n.getItemTpl(e,t),u=$(o);if(t!==undefined){var a=r.find("."+i)[t];a?u.insertBefore(a):u.appendTo(r)}else u.appendTo(r);return u.addClass(i),u.data(s,e),u},getItemStatusCls:function(e){return s(e,this)},setItemStatusCls:function(e,t,n){var r=this,i=r.getItemStatusCls(e),s=n?"addClass":"removeClass";t&&$(t)[s](i)},hasStatus:function(e,t){var n=this,r=n.getItemStatusCls(e);return $(t).hasClass(r)},setItemSelected:function(e,t,n){var r=this;n=n||r.findElement(e),r.setItemStatusCls("selected",n,t)},getAllElements:function(){var e=this,t=e.get("itemCls"),n=e.get("el");return n.find("."+t)},getItemByElement:function(e){var t=this,n=t.get("dataField");return $(e).data(n)},getFirstElementByStatus:function(e){var t=this,n=t.getItemStatusCls(e),r=t.get("el");return r.find("."+n)[0]},getElementsByStatus:function(e){var t=this,n=t.getItemStatusCls(e),r=t.get("el");return r.find("."+n)},getSelectedElements:function(){var e=this,t=e.getItemStatusCls("selected"),n=e.get("el");return n.find("."+t)},findElement:function(e){var n=this,r=n.getAllElements(),i=null;return t.each(r,function(t){if(n.getItemByElement(t)==e)return i=t,!1}),i},isElementSelected:function(e){var t=this,n=t.getItemStatusCls("selected");return e&&$(e).hasClass(n)}};var a=function(){};return a.ATTRS=t.merge(!0,i.ATTRS,n.ATTRS,{dataField:{view:!0,value:"data-item"},itemContainer:{view:!0},itemStatusFields:{value:{}},itemCls:{view:!0},textGetter:{},events:{value:{itemrendered:!0,itemremoved:!0,itemupdated:!0,itemsshow:!1,beforeitemsshow:!1,itemsclear:!1,beforeitemsclear:!1}}}),a.PARSER={items:function(e){var n=this,r=[],i=n.get("itemCls"),s=n.get("dataField"),o=e.find("."+i);return t.each(o,function(e){var t=u(e,n);r.push(t),$(e).data(s,t)}),r}},t.augment(a,i,n,{_uiSetItems:function(e){var t=this;if(t.get("srcNode")&&!t.get("rendered"))return;this.setItems(e)},__bindUI:function(){function i(t,n){var r=e.get("multipleSelect"),i;i=e.isItemSelected(t,n),i?r&&e.setItemSelected(t,!1,n):(r||e.clearSelected(),e.setItemSelected(t,!0,n))}var e=this,t=e.get("selectedEvent"),n=e.get("itemCls"),r=e.get("view").getItemContainer();r.delegate("."+n,"click",function(n){var r=$(n.currentTarget),s=e.getItemByElement(r);if(e.isItemDisabled(s,r))return;var o=e.fire("itemclick",{item:s,element:r[0],domTarget:n.target,domEvent:n});o!==!1&&t=="click"&&i(s,r)}),t!=="click"&&r.delegate("."+n,t,function(t){var n=$(t.currentTarget),r=e.getItemByElement(n);if(e.isItemDisabled(r,n))return;i(r,n)}),e.on("itemrendered itemupdated",function(t){var n=t.item,r=t.element;e._syncItemStatus(n,r)})},getValueByField:function(e,t){return e&&e[t]},_syncItemStatus:function(e,n){var r=this,i=r.get("itemStatusFields");t.each(i,function(t,i){r.get("view").setItemStatusCls(i,n,e[t])})},getStatusValue:function(e,t){var n=this,r=n.get("itemStatusFields"),i=r[t];return e[i]},getCount:function(){return this.getItems().length},getStatusField:function(e){var t=this,n=t.get("itemStatusFields");return n[e]},setStatusValue:function(e,t,n){var r=this,i=r.get("itemStatusFields"),s=i[t];s&&(e[s]=n)},getItemText:function(e){var t=this,n=t.get("textGetter");return e?n?n(e):$(t.findElement(e)).text():""},removeItem:function(e){var n=this,r=n.get("items"),i=n.findElement(e),s;s=t.Array.indexOf(e,r),s!==-1&&r.splice(s,1),n.get("view").removeItem(e,i),n.fire("itemremoved",{item:e,domTarget:$(i)[0],element:i})},addItemAt:function(e,t){var n=this,r=n.get("items");return t===undefined&&(t=r.length),r.splice(t,0,e),n.addItemToView(e,t),e},addItemToView:function(e,t){var n=this,r=n.get("view").addItem(e,t);n.fire("itemrendered",{item:e,domTarget:$(r)[0],element:r})},updateItem:function(e){var t=this,n=t.get("view").updateItem(e);t.fire("itemupdated",{item:e,domTarget:$(n)[0],element:n})},setItems:function(e){var n=this;n.clearControl(),n.fire("beforeitemsshow"),t.each(e,function(e,t){n.addItemToView(e,t)}),n.fire("itemsshow")},getItems:function(){return this.get("items")},getItemByElement:function(e){return this.get("view").getItemByElement(e)},getSelected:function(){var e=this,t=e.get("view").getFirstElementByStatus("selected");return e.getItemByElement(t)||null},getItemsByStatus:function(e){var n=this,r=n.get("view").getElementsByStatus(e),i=[];return t.each(r,function(e){i.push(n.getItemByElement(e))}),i},findElement:function(e){var n=this;return t.isString(e)&&(e=n.getItem(e)),this.get("view").findElement(e)},findItemByField:function(e,n){var r=this,i=r.get("items"),s=null;return t.each(i,function(t){if(t[e]===n)return s=t,!1}),s},setItemSelectedStatus:function(e,t,n){var r=this;n=n||r.findElement(e),r.setItemStatus(e,"selected",t,n)},setAllSelection:function(){var e=this,t=e.getItems();e.setSelection(t)},isItemSelected:function(e,t){var n=this;return t=t||n.findElement(e),n.get("view").isElementSelected(t)},isItemDisabled:function(e,t){return this.hasStatus(e,"disabled",t)},setItemDisabled:function(e,t){var n=this;n.setItemStatus(e,"disabled",t)},getSelection:function(){var e=this,n=e.get("view").getSelectedElements(),r=[];return t.each(n,function(t){r.push(e.getItemByElement(t))}),r},clearControl:function(){this.fire("beforeitemsclear"),this.get("view").clearControl(),this.fire("itemsclear")},hasStatus:function(e,t,n){var r=this;return n=n||r.findElement(e),r.get("view").hasStatus(t,n)},setItemStatus:function(e,t,n,r){var i=this;r=r||i.findElement(e);if(!i.isItemDisabled(e,r)||t==="disabled")t==="disabled"&&n&&i.clearItemStatus(e),i.setStatusValue(e,t,n),i.get("view").setItemStatusCls(t,r,n),i.fire("itemstatuschange",{item:e,status:t,value:n,element:r}),t==="selected"&&i.afterSelected(e,n,r)},clearItemStatus:function(e,n,r){var i=this,s=i.get("itemStatusFields");r=r||i.findElement(e),n?i.setItemStatus(e,n,!1,r):(t.each(s,function(t,n){i.setItemStatus(e,n,!1,r)}),s.selected||i.setItemSelected(e,!1),i.setItemStatus(e,"hover",!1))}}),a.View=o,a}),define("bui/list/keynav",function(){"use strict";var e=function(){};return e.ATTRS={highlightedStatus:{value:"hover"}},BUI.augment(e,{setHighlighted:function(e,t){var n=this,r=n.get("highlightedStatus"),i=n.getHighlighted();i!==e&&(this.setItemStatus(i,r,!1),this.setItemStatus(e,r,!0,t))},getHighlighted:function(){var e=this,t=e.get("highlightedStatus"),n=e.get("view").getFirstElementByStatus(t);return e.getItemByElement(n)||null},getColumnCount:function(){var e=this,t=e.getFirstItem(),n=e.findElement(t),r=$(n);return n?parseInt(r.parent().width()/r.outerWidth(),10):1},getRowCount:function(e){var t=this;return e=e||t.getColumnCount(),(this.getCount()+e-1)/e},_getNextItem:function(e,t,n){var r=this,i=r._getCurrentIndex(),s=r.getCount(),o=e?1:-1,u;return i===-1?e?r.getFirstItem():r.getLastItem():(e||(t*=o),u=(i+t+n)%n,u>s-1&&(e?u-=s-1:u+=t),r.getItemAt(u))},_getLeftItem:function(){var e=this,t=e.getCount(),n=e.getColumnCount();return!t||n<=1?null:e._getNextItem(!1,1,t)},_getCurrentItem:function(){return this.getHighlighted()},_getCurrentIndex:function(){var e=this,t=e._getCurrentItem();return this.indexOfItem(t)},_getRightItem:function(){var e=this,t=e.getCount(),n=e.getColumnCount();return!t||n<=1?null:this._getNextItem(!0,1,t)},_getDownItem:function(){var e=this,t=e.getColumnCount(),n=e.getRowCount(t);return n<=1?null:this._getNextItem(!0,t,t*n)},_getUpperItem:function(){var e=this,t=e.getColumnCount(),n=e.getRowCount(t);return n<=1?null:this._getNextItem(!1,t,t*n)},handleNavUp:function(e){var t=this,n=t._getUpperItem();t.setHighlighted(n)},handleNavDown:function(e){this.setHighlighted(this._getDownItem())},handleNavLeft:function(e){this.setHighlighted(this._getLeftItem())},handleNavRight:function(e){this.setHighlighted(this._getRightItem())},handleNavEnter:function(e){var t=this,n=t._getCurrentItem();n&&t.setSelected(n)},handleNavEsc:function(e){this.setHighlighted(null)},handleNavTab:function(e){this.setHighlighted(this._getRightItem())}}),e}),define("bui/list/simplelist",["bui/common","bui/list/domlist","bui/list/keynav"],function(e){var t=e("bui/common"),n=t.Component.UIBase,r=e("bui/list/domlist"),i=e("bui/list/keynav"),s=t.prefix+"list-item",o=t.Component.View.extend([r.View],{setElementHover:function(e,t){var n=this;n.setItemStatusCls("hover",e,t)}},{ATTRS:{itemContainer:{valueFn:function(){return this.get("el").children(this.get("listSelector"))}}}},{xclass:"simple-list-view"}),u=t.Component.Controller.extend([r,n.Bindable,i],{bindUI:function(){var e=this,t=e.get("itemCls"),n=e.get("view").getItemContainer();n.delegate("."+t,"mouseover",function(t){var n=t.currentTarget,r=e.getItemByElement(n);if(e.isItemDisabled(t.item,t.currentTarget))return;e.get("highlightedStatus")==="hover"?e.setHighlighted(r,n):e.setItemStatus(r,"hover",!0,n)}).delegate("."+t,"mouseout",function(t){var n=$(t.currentTarget);e.get("view").setElementHover(n,!1)})},onAdd:function(e){var t=this,n=e.record;t.addItemToView(n,e.index)},onRemove:function(e){var t=this,n=e.record;t.removeItem(n)},onUpdate:function(e){this.updateItem(e.record)},onLocalSort:function(e){this.onLoad(e)},onLoad:function(){var e=this,t=e.get("store"),n=t.getResult();e.set("items",n)}},{ATTRS:{items:{view:!0,value:[]},itemCls:{view:!0,value:s},idField:{value:"value"},listSelector:{view:!0,value:"ul"},itemTpl:{view:!0,value:'<li role="option" class="'+s+'">{text}</li>'},tpl:{value:"<ul></ul>"},xview:{value:o}}},{xclass:"simple-list",prority:0});return u.View=o,u}),define("bui/list/listbox",["bui/list/simplelist"],function(e){var t=e("bui/list/simplelist"),n=t.extend({bindUI:function(){var e=this;e.on("selectedchange",function(e){var t=e.item,n=$(e.domTarget),r=n.find("input");t&&r.attr("checked",e.selected)})}},{ATTRS:{itemTpl:{value:'<li><span class="checkbox"><input type="checkbox" />{text}</span></li>'},multipleSelect:{value:!0}}},{xclass:"listbox"});return n}),define("bui/list/listitem",function(e){var t=BUI.Component,n=t.UIBase,r=t.View.extend([n.ListItemView],{}),i=t.Controller.extend([n.ListItem],{},{ATTRS:{elTagName:{view:!0,value:"li"},xview:{value:r},tpl:{view:!0,value:"<span>{text}</span>"}}},{xclass:"list-item"});return i.View=r,i}),define("bui/list/list",function(e){var t=BUI.Component,n=t.UIBase,r=t.Controller.extend([n.ChildList],{},{ATTRS:{elTagName:{view:!0,value:"ul"},idField:{value:"id"},defaultChildClass:{value:"list-item"}}},{xclass:"list"});return r});
