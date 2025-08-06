import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, FileText, TrendingUp, Wallet } from "lucide-react"

interface EmptyStateProps {
  title: string
  description: string
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
    icon?: React.ReactNode
  }
  variant?: "transactions" | "dashboard" | "default"
}

export function EmptyState({ 
  title, 
  description, 
  icon, 
  action, 
  variant = "default" 
}: EmptyStateProps) {
  const getDefaultIcon = () => {
    switch (variant) {
      case "transactions":
        return <FileText className="h-12 w-12 text-muted-foreground" />
      case "dashboard":
        return <TrendingUp className="h-12 w-12 text-muted-foreground" />
      default:
        return <Wallet className="h-12 w-12 text-muted-foreground" />
    }
  }

  return (
    <Card className="border-dashed">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          {icon || getDefaultIcon()}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        {action && (
          <Button onClick={action.onClick} className="mt-4">
            {action.icon || <Plus className="h-4 w-4 mr-2" />}
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  )
} 