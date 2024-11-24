// import { campaigns } from '@/lib/mock-data';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// export default function CampaignsPage() {
//   const textCampaigns = campaigns.filter(campaign => campaign.type === 'text');
//   const htmlCampaigns = campaigns.filter(campaign => campaign.type === 'html');

//   return (
//     (<div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Campaigns</h1>
//       <div className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//           {textCampaigns.map((campaign) => (
//             <Card key={campaign.id}>
//               <CardHeader>
//                 <CardTitle>{campaign.tagline}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p>{campaign.content}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//       <div>
//         <h2 className="text-2xl font-semibold mb-4">HTML Campaigns</h2>
//         <Accordion type="single" collapsible className="space-y-4">
//           {htmlCampaigns.map((campaign) => (
//             <AccordionItem key={campaign.id} value={campaign.id}>
//               <AccordionTrigger>
//                 <span className="text-left">
//                   Template: {campaign.templateName}
//                   <Badge variant="outline" className="ml-2">HTML</Badge>
//                 </span>
//               </AccordionTrigger>
//               <AccordionContent>
//                 <div className="space-y-4">
//                   <div>
//                     <h4 className="font-semibold">Variables:</h4>
//                     <pre className="bg-gray-100 p-2 rounded-md text-sm">
//                       {JSON.stringify(campaign.variables, null, 2)}
//                     </pre>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold">Preview:</h4>
//                     <div className="border p-4 rounded-md">
//                       <iframe
//                         srcDoc={campaign.content}
//                         className="w-full h-64 border-0"
//                         title={`Preview of ${campaign.templateName}`} />
//                     </div>
//                   </div>
//                 </div>
//               </AccordionContent>
//             </AccordionItem>
//           ))}
//         </Accordion>
//       </div>
//     </div>)
//   );
// }

'use client'

import { useSelector } from 'react-redux'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PlusCircle } from 'lucide-react'

export default function CampaignsPage() {
  const campaigns = useSelector((state) => state.onboarding.campaigns)
  const textCampaigns = campaigns.filter(campaign => campaign.type === 'text');
  const htmlCampaigns = campaigns.filter(campaign => campaign.type === 'html');

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <div className="space-x-2">
          <Button asChild>
            <Link href="/campaigns/create/notification">
              <PlusCircle className="mr-2 h-4 w-4" /> New Notification
            </Link>
          </Button>
          <Button asChild>
            <Link href="/campaigns/create">
              <PlusCircle className="mr-2 h-4 w-4" /> New Mail
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {textCampaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardHeader>
                <CardTitle>{campaign.tagline}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{campaign.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">HTML Campaigns</h2>
        <Accordion type="single" collapsible className="space-y-4">
          {htmlCampaigns.map((campaign) => (
            <AccordionItem key={campaign.id} value={campaign.id}>
              <AccordionTrigger>
                <span className="text-left">
                  Template: {campaign.templateName}
                  <Badge variant="outline" className="ml-2">HTML</Badge>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Variables:</h4>
                    <pre className="bg-gray-100 p-2 rounded-md text-sm">
                      {JSON.stringify(campaign.variables, null, 2)}
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-semibold">Preview:</h4>
                    <div className="border p-4 rounded-md">
                      <iframe
                        srcDoc={campaign.content}
                        className="w-full h-64 border-0"
                        title={`Preview of ${campaign.templateName}`}
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}


