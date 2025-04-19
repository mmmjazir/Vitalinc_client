import { useState } from 'react'
import { Star } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface AddReviewDialogProps {
  user:any;
  isOpen: boolean
  onClose: () => void
  onSubmit: (review: { rating: number; comment?: string }) => void;
  addReviewLoading:any;
}

export function AddReviewDialog({ isOpen, onClose, onSubmit, user,addReviewLoading }: AddReviewDialogProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit({
        rating,
        comment: comment.trim()
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">Add Your Review</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-10 h-10 cursor-pointer transition-colors ${
                  star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 hover:text-yellow-200'
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this pharmacy (optional)"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={rating === 0} className="bg-teal-600 hover:bg-teal-700 text-white">
            {addReviewLoading ? 'Sending feedback...' : 'Submit Review'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

