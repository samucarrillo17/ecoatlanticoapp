
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
type Props = {
    handlePrint: () => void
}
export default function CardCertificados({handlePrint}:Props) {
  return (
    <Card className='overflow-hidden pt-0 border border-black/10'>
      <CardHeader className='bg-brand-blue py-4'>
        <CardTitle className='text-white text-center text-xl'>
            Certificado 20 horas de voluntariado
        </CardTitle>
        
      </CardHeader>
      <CardContent className='space-y-5'>
          <p className='text-sm'>
            Obtenga un certificado de 20 horas de voluntariado para mostrar tus logros y lograr tus metas.
          </p>
            <Button className='bg-brand-green text-white rfont-bold cursor-pointer'
            onClick={handlePrint}>
                Obtener certificado
            </Button>
        </CardContent>
    </Card>
  )
}
