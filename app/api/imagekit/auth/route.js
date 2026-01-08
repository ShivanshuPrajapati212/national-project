
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

console.log(process.env.NEXT_IMAGEKIT_PUBLIC_KEY)

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.NEXT_IMAGEKIT_URL_ENDPOINT,
});

export async function GET(request) {
    return NextResponse.json(imagekit.getAuthenticationParameters());
}
