import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PhoneAndroid, WhatsApp } from '@mui/icons-material';
import { Flex, Text } from '@tremor/react';
import { Edit, Mail, Phone, User } from 'lucide-react';
import React, { FC } from 'react'

type Props = {
    pharmacyInfo:any;
    handleSetRoute:any
}

const ContactSection:FC<Props> = ({pharmacyInfo,handleSetRoute}) => {
  return (
      <Card className="p-6 bg-white shadow-lg rounded-xl">
                <div className="flex gap-3">
                  <h2 className="text-2xl font-semibold mb-4">Contact Info</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSetRoute("contactInfo")}
                  >
                    <Edit className="w-5 text-gray-500 h-5" />
                  </Button>
                </div>
    
                <div className="space-y-4 font-medium text-gray-500">
                  <Flex>
                    <User className="w-5 h-5 text-teal-500 mr-2" />
                    <div className="flex gap-1">
                      <Text className="font-medium capitalize">{`${pharmacyInfo.contactPersonName.title}.`}</Text>
                      <Text className="font-medium">{`${pharmacyInfo.contactPersonName.name}`}</Text>
                    </div>
                  </Flex>
                  <Flex>
                    <PhoneAndroid className="w-5 h-5 text-blue-500" />
                    <Text>+91 {pharmacyInfo.mobileNumber}</Text>
                  </Flex>
    
                  {pharmacyInfo.additionalMobileNumbers.length > 0 &&
                    pharmacyInfo.additionalMobileNumbers.map(
                      (phonenumber: any, index: number) => (
                        <Flex key={index}>
                          <span>
                            <PhoneAndroid className="w-5 h-5 text-blue-500" /> +
                          </span>
                          <Text>+91 {phonenumber}</Text>
                        </Flex>
                      )
                    )}
    
                  {pharmacyInfo.whatsappNumber && (
                    <Flex>
                      <WhatsApp className="w-5 h-5 text-green-500" />
                      <Text>{pharmacyInfo.whatsappNumber}</Text>
                    </Flex>
                  )}
    
                  {pharmacyInfo.telephoneNumber.areaCode &&
                    pharmacyInfo.telephoneNumber.number && (
                      <Flex>
                        <Phone className="w-5 h-5 text-blue-500" />
                        <Text>
                          <span>{pharmacyInfo.telephoneNumber.areaCode} -</span>
                          {` ${pharmacyInfo.telephoneNumber.number}`}
                        </Text>
                      </Flex>
                    )}
    
                  <Flex>
                    <Mail className="w-5 h-5 text-blue-500" />
                    <Text>{pharmacyInfo.email}</Text>
                  </Flex>
                </div>
              </Card>
  )
}

export default ContactSection