interface CardProps {
  title: string;
  children: React.ReactNode;
}

export default function ({title, children} : CardProps){
  return <div className="bg rounded-lg p-4 bg-slate-100/50">
    <div className="text-xl border-b p-2">
      {title}
    </div>
    {children}
  </div>
}
