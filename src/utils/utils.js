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

export const composeData = (group, description) => {
  return (e_domain, e_port, e_auth, e_recvServicePort) => {
    return (w_domain, w_port) => {
      let requestData = {
        group,
        description,
        encodeDevices: [
          {
            domain: e_domain,
            port: e_port,
            auth: e_auth,
            recvServicePort: e_recvServicePort
          }
        ],
        recvStreamServices: [
          {
            domain: w_domain,
            port: w_port
          }
        ]
      };
      return requestData;
    }
  }
}

export const getRouteParams = (namelist = [], targetId) => {
  return (rootUrl = '/homev2', menu = 'unit', smenu = 'list') => {
    // console.log('[nameList]', namelist);
    // console.log('[路径参数制作]');
    const selectedItem = getLocalStorage('selectedItem');
    const selectedMenuItem = getLocalStorage('selectedMenuItem');
    const selectedUnitItem = getLocalStorage('selectedUnitItem');
    // let targetId;
    let pathname;
    let targetName;
    let targetMenu;
    let targetSMenu;
    if (!targetId) {
      // - 
      // connected-react-redux保存了刷新后的路由, 暂时不需要使用selectedItem
      // if (selectedItem) { 
      //   targetId = selectedItem;
      // } else {
      //   const [first = {}] = namelist;
      //   targetId = first.group_id;
      // }
      const [first = {}] = namelist;
      console.log('[first]', first);
      targetId = first.group_id;
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

    console.log('[pathname]', pathname, targetId, targetName);

    return {
      pathname,
      state: {
        group_id: targetId,
        group: targetName,
      }
    }
  }
};

// export const getRouteParams = (rootUrl = '/homev2', namelist = [], targetId, menu = 'unit', smenu = 'list') => {
//   // console.log('[路径参数制作]');
//   const selectedItem = getLocalStorage('selectedItem');
//   const selectedMenuItem = getLocalStorage('selectedMenuItem');
//   const selectedUnitItem = getLocalStorage('selectedUnitItem');
//   // let targetId;
//   let pathname;
//   let targetName;
//   let targetMenu;
//   let targetSMenu;
//   if (!targetId) {
//     if (selectedItem) {
//       targetId = selectedItem;
//     } else {
//       const [first = {}] = namelist;
//       targetId = first.group_id;
//     }
//   }
//   // console.log('[targetId]', targetId);
//
//   const index = namelist
//     .findIndex((v) => (v.group_id === targetId));
//   if (index > -1) {
//     targetName = namelist[index].group;
//   }
//   // console.log('[target]', targetId, targetName);
//
//   targetMenu = menu ? menu : selectedMenuItem;
//   pathname = rootUrl + '/' + targetMenu;
//
//
//   if (menu === 'unit') {
//     targetSMenu = smenu ? smenu : selectedUnitItem;
//     pathname = pathname + '/' + targetSMenu;
//   }
//
//   console.log('[pathname]', pathname);
//
//   return {
//     pathname,
//     state: {
//       group_id: targetId,
//       group: targetName,
//     }
//   }
// };

/**
 * 一级路由优先级: targetId > selectedItem > namelist首选项
 * 二级路由优先级:
 *
 * 简化路由的传递参数: getRouteParams(路径1, 路径2, 路径3, 路径4, ...)
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