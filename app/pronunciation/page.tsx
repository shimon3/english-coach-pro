import Link from "next/link"
import { Mic, BookOpen, ArrowRight } from "lucide-react"

export default function PronunciationPage() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Pronunciation Training</h1>
        <p className="text-sm text-muted-foreground">IPA drills et exercices d&apos;enregistrement pour l&apos;anglais IT</p>
      </div>

      <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 flex gap-4">
        <div className="h-10 w-10 rounded-xl bg-violet-500/15 flex items-center justify-center shrink-0">
          <Mic className="h-5 w-5 text-violet-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">Module en cours de développement</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Les exercices de prononciation IPA arrivent bientôt.
            En attendant, utilise le bouton audio sur chaque mot du vocabulaire pour entendre la prononciation correcte.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Disponible maintenant</p>
        <Link
          href="/vocabulary"
          className="flex items-center justify-between rounded-2xl border border-border/50 bg-card/60 p-4 hover:border-brand-500/30 hover:bg-brand-500/5 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-brand-500/10 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-brand-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Vocabulaire</p>
              <p className="text-xs text-muted-foreground">Bouton audio sur chaque mot avec phonétique IPA</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-brand-400 transition-colors" />
        </Link>
      </div>
    </div>
  )
}
