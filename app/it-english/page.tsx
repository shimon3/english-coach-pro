import Link from "next/link"
import { Monitor, MessageSquare, BookOpen, ArrowRight } from "lucide-react"

export default function ITEnglishPage() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">IT English</h1>
        <p className="text-sm text-muted-foreground">Anglais professionnel pour administrateurs systèmes</p>
      </div>

      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 flex gap-4">
        <div className="h-10 w-10 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
          <Monitor className="h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">Module en cours de développement</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Les leçons d&apos;anglais professionnel IT (emails, rapports d&apos;incidents, réunions) arrivent bientôt.
            En attendant, tous les modules existants couvrent déjà l&apos;anglais IT pratique.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Disponible maintenant</p>
        <Link
          href="/conversations"
          className="flex items-center justify-between rounded-2xl border border-border/50 bg-card/60 p-4 hover:border-brand-500/30 hover:bg-brand-500/5 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-brand-500/10 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-brand-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">AI Conversations</p>
              <p className="text-xs text-muted-foreground">Scénarios helpdesk, incidents, réunions en anglais IT</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-brand-400 transition-colors" />
        </Link>
        <Link
          href="/vocabulary"
          className="flex items-center justify-between rounded-2xl border border-border/50 bg-card/60 p-4 hover:border-brand-500/30 hover:bg-brand-500/5 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-brand-500/10 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-brand-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Vocabulaire IT</p>
              <p className="text-xs text-muted-foreground">280 mots spécialisés : réseau, sécurité, Active Directory…</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-brand-400 transition-colors" />
        </Link>
      </div>
    </div>
  )
}
