
export interface AppStateInterface {
[x: string]: any;
    leftDrawerOpen: boolean,
    rightDrawerOpen: boolean,
}


export function appState (): AppStateInterface {
  return {
    leftDrawerOpen : true,
    rightDrawerOpen : false,
  }
}

export default appState;
