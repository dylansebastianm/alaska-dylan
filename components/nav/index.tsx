"use client"
import { Mail, Search, ShoppingCart, PhoneIcon as WhatsApp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from './assets/logo-alaskacircular.d7245bf.svg';
import Image from "next/image";
import { getUserData } from "@/lib/actions";

export default async function Navbar() {
    const { data: userData } = await getUserData();

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
    return <Image src={Logo} alt="logo alaska" />;
}

function SearchBar() {
    return (
        <div className="flex w-full max-w-xl items-center px-4">
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
            <Button variant="secondary" className="bg-[#C88D7C] text-white hover:bg-[#C88D7C]/90">
                Vender
            </Button>
            <IconButton icon={Mail} />
            <IconButton icon={WhatsApp} />
            <CartButton />
            <UserInitials name={userData?.name} surname={userData?.surname} />
        </div>
    );
}

function IconButton({ icon: Icon }: { icon: any }) {
    return (
        <Button variant="ghost" size="icon">
            <Icon className="h-5 w-5" />
        </Button>
    );
}

function CartButton() {
    return (
        <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#A7B89D] text-[10px] text-white">
                5
            </span>
        </Button>
    );
}

function UserInitials({ name, surname }: { name?: string; surname?: string }) {
    const initials = name && surname ? `${name[0]}${surname[0]}`.toUpperCase() : "DM";
    return (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#A7B89D] text-sm text-white">
            {initials}
        </div>
    );
}
