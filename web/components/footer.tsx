import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { Suspense } from "react";
import { connection } from "next/server";


export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="nav__brand" style={{ marginBottom: 14 }}>
              <img src="/logo.png" alt="" style={{ height: 52, mixBlendMode: 'lighten' }} />
              <span>{SITE.name}</span>
            </div>
            <p className="muted" style={{ maxWidth: '34ch' }}>{SITE.description}</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Visit us</h4>
            <ul>
              <li>{SITE.address}</li>
              <li><a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a></li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              {SITE.hours.map((h) => (
                <li key={h.days}>{h.days}: {h.time}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
            <Suspense fallback={<GetYearSkeleton/>}>
                <GetYear/>
            </Suspense>
          <span>{SITE.tagline}</span>
        </div>
      </div>
    </footer>
  )
}

function GetYearSkeleton(){
    return <span>loading...</span>
}
async function GetYear(){
    await connection()
    return <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
}