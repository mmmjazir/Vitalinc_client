import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Flex, Text } from '@tremor/react'
import { Edit } from 'lucide-react'
import React, { FC } from 'react'

type Props = {
    hours:any,
    handleSetRoute:any
}

const BusinessHours:FC<Props> = ({hours,handleSetRoute}) => {
    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        const formattedHour = (hours % 12) || 12;
        const period = hours < 12 ? 'AM' : 'PM';
        return `${formattedHour}:${minutes} ${period}`;
        // const date = new Date(2000, 0, 1, hours, minutes);
        // return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      };
    
      const getHoursString = (day) => {
        if (!day.isOpen) return 'Closed';
        if (day.startTime === day.endTime) return 'Open 24 hours';
        return `${formatTime(day.startTime)} - ${formatTime(day.endTime)}`;
      };
  
    return (
    <Card className="p-6 bg-white shadow-lg rounded-xl">
            <div className="flex gap-3">
            <h2 className="text-2xl font-semibold mb-4">Operating Hours</h2>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSetRoute("Hours")}
              >
                <Edit className="w-5 text-gray-500 h-5" />
              </Button>
            </div>
            <div className="space-y-2">
        {Object.entries(hours).map(([day, dayInfo]) => (
          <Flex key={day} className="justify-between">
            <Text className="font-medium">{day}</Text>
            <Text>{getHoursString(dayInfo)}</Text>
          </Flex>
        ))}
      </div>
             
            </Card>
  )
}

export default BusinessHours