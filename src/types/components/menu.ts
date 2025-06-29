

export interface SideMenuMeta {

}

export interface SideMenu {
    id: string,
    name: string,
    title?: string,
    path: string,
    icon: string,
    meta?: SideMenuMeta,
    children?: SideMenu[]
}