import { NextRequest, NextResponse } from "next/server";

export type IRole = 'ADMIN' | 'CUSTOMER' 
export interface IUser {
    username: string
    role: IRole
}

export function proxy (request: NextRequest) {
    const userCookie = request.cookies.get("admin")?.value;

    const {pathname} = request.nextUrl;
    console.log(pathname)
    const toUserPage = pathname.startsWith('/user')
    const toAdminPage = pathname.startsWith('/admin')
    const isNeedSession = toUserPage || toAdminPage

    if (isNeedSession) {
        if (!userCookie) {
            return NextResponse.redirect(new URL("/", request.url));
        }

    const user = JSON.parse(userCookie) as IUser

    if (toAdminPage && user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (toUserPage && user.role !== 'CUSTOMER') {
        return NextResponse.redirect(new URL("/", request.url));
    }

    }

    return NextResponse.next()
}