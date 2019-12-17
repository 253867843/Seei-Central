// localStorage
import React from "react";

export const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, value);
};

export const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const removeLocalStorage = (key) => {
  return localStorage.removeItem(key);
};

export const getRouteParams = (rootUrl = '/homev2', namelist = [], targetId, menu = 'unit', smenu = 'list') => {
  console.log('[路径参数制作]');
  const selectedItem = getLocalStorage('selectedItem');
  const selectedMenuItem = getLocalStorage('selectedMenuItem');
  const selectedUnitItem = getLocalStorage('selectedUnitItem');
  // let targetId;
  let pathname;
  let targetName;
  let targetMenu;
  let targetSMenu;
  if (!targetId) {
    if (selectedItem) {
      targetId = selectedItem;
    } else {
      const [first = {}] = namelist;
      targetId = first.group_id;
    }
  }
  // console.log('[targetId]', targetId);

  const index = namelist
    .findIndex((v) => (v.group_id === targetId));
  if (index > -1) {
    targetName = namelist[index].group;
  }
  // console.log('[target]', targetId, targetName);

  targetMenu = menu ? menu : selectedMenuItem;
  pathname = rootUrl + '/' + targetMenu;


  if (menu === 'unit') {
    targetSMenu = smenu ? smenu : selectedUnitItem;
    pathname = pathname + '/' + targetSMenu;
  }

  console.log('[pathname]', pathname);

  return {
    pathname,
    state: {
      group_id: targetId,
      group: targetName,
    }
  }
};

/**
 * 一级路由优先级: targetId > selectedItem > namelist首选项
 * 二级路由优先级:
 * */

/**
 * 两部分:
 * 1.路由制作
 * 2.group_id和group制作
 * */

/**
 * connected-react-router可以记录刷新页面前的状态: @@router/LOCATION_CHANGE
 * 刷新流程没有走这个方法...
 * */