"use client"
import { Mail, Search, ShoppingCart, PhoneIcon as WhatsApp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from './assets/logo-alaskacircular.d7245bf.svg';
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getUserData } from "@/lib/actions";

export default async function Navbar() {
    const { id } = useParams();
    const userId = Number(id);
    const { data: userData } = await getUserData(userId);

    return (
        <div className="w-full">
            <TopBanner />
            <div className="container mx-auto flex items-center justify-between py-4">
                <LogoSection />
                <SearchBar />
                <UserActions userData={userData} />
            </div>
        </div>
    );
}

function TopBanner() {
    return (
        <div className="w-full bg-[#A7B89D] py-2">
            <p className="text-center text-sm text-white">Compras Seguras. Devoluciones Garantizadas</p>
        </div>
    );
}

function LogoSection() {
    return (
        <Link href="https://alaskacircular.com/">
            <Image src={Logo} alt="logo alaska" className="cursor-pointer" />
        </Link>
    );
}

function SearchBar() {
    return (
        <div className="hidden md:flex w-full max-w-xl items-center px-4">
            <div className="relative w-full">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar un producto" className="w-full pl-8" />
            </div>
        </div>
    );
}

function UserActions({ userData }: { userData: any }) {
    return (
        <div className="flex items-center gap-4">
            <Link href="https://alaskacircular.com/signup?t=seller">
                <Button variant="secondary" className="hidden md:flex bg-[#C88D7C] text-white hover:bg-[#C88D7C]/90 cursor-pointer">
                    Vender
                </Button>
            </Link>
            <div className="hidden md:flex gap-4">
                <IconButton icon={Mail} href="https://alaskacircular.com/contacto" />
                <IconButton icon={WhatsApp} href="https://api.whatsapp.com/send/?phone=34620851939&text&type=phone_number&app_absent=0" />
                <CartButton />
            </div>
            <UserInitials name={userData?.name} surname={userData?.surname} />
        </div>
    );
}

function IconButton({ icon: Icon, href }: { icon: any; href: string }) {
    return (
        <Link href={href} rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="cursor-pointer">
                <Icon className="h-5 w-5" />
            </Button>
        </Link>
    );
}

function CartButton() {
    return (
        <Link href="https://alaskacircular.com/">
            <Button variant="ghost" size="icon" className="relative cursor-pointer">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#A7B89D] text-[10px] text-white">
                    5
                </span>
            </Button>
        </Link>
    );
}

function UserInitials({ name, surname }: { name?: string; surname?: string }) {
    const initials = name && surname ? `${name[0]}${surname[0]}`.toUpperCase() : "DM";
    return (
        <Link href="https://alaskacircular.com/signup">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#A7B89D] text-sm text-white cursor-pointer">
                {initials}
            </div>
        </Link>
    );
}
