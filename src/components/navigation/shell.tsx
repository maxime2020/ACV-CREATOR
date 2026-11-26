"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { ArrowUpRight, CalendarDays, ChevronDown, Download, GraduationCap, House, Layers, Lightbulb, Menu, Play, Store, X } from "lucide-react";

const navigation = [
  { path: "/dashboard", label: "Accueil", icon: House },
  { path: "/business", label: "Mon business", icon: Store },
  { path: "/strategy", label: "Ma stratégie ACV", icon: Layers },
  { path: "/ideas", label: "Mes 30 idées", icon: Lightbulb },
  { path: "/calendar", label: "Mon calendrier", icon: CalendarDays },
  { path: "/export", label: "Exporter en PDF", icon: Download },
];

function Brand() {
  return (
    <Link href="/dashboard" className="brand" aria-label="Mon Plan TikTok ACV, accueil">
      <span className="brand-icon"><Play size={25} strokeWidth={3.8} /></span>
      <span>Mon Plan<br />TikTok <b>ACV</b></span>
    </Link>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpenedFor, setMenuOpenedFor] = useState("");
  const menuOpen = menuOpenedFor === pathname;
  const activePage = navigation.find(({ path }) => path === pathname);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <aside className="sidebar">
        <div className="sidebar-top">
          <Brand />
          <button type="button" className="mobile-toggle" aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpenedFor(menuOpen ? "" : pathname)}>
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        <nav id="main-navigation" aria-label="Navigation principale" className={menuOpen ? "side-nav open" : "side-nav"}>
          {navigation.map(({ path, label, icon: Icon }) => (
            <Link href={path} key={path} aria-current={pathname === path ? "page" : undefined} onClick={() => setMenuOpenedFor("")}>
              <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className="sidebar-help">
          <span className="help-icon"><GraduationCap size={20} /></span>
          <div>
            <strong>Besoin d’aide ?</strong>
            <p>Retrouve les bases de la méthode ACV.</p>
            <Link href="/strategy#les-piliers">Voir la méthode <ArrowUpRight size={13} /></Link>
          </div>
        </div>
        <span className="sidebar-credit">Un Max de Clients</span>
      </aside>
      <div className="app-main">
        <header className="topbar">
          <span className="breadcrumb">{activePage?.label}</span>
          <div className="account-area">
            <span className="demo-label"><i /> Mode démo</span>
            <details className="account">
              <summary><span className="avatar" aria-hidden="true">AA</span><span className="account-label">Mon compte</span><ChevronDown size={14} /></summary>
              <div className="account-popover"><strong>Atelier Ayo</strong><p>Compte de démonstration</p></div>
            </details>
          </div>
        </header>
        <main id="contenu" tabIndex={-1} className="content">{children}</main>
      </div>
    </div>
  );
}
