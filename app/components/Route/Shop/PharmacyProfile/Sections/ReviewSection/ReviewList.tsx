"use client";

import { useEffect, useState } from "react";
import {
  Star,
  ThumbsUp,
  Trash2,
  Edit2,
  MoreVertical,
  CircleCheckBig,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatDistanceToNowStrict } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ReviewListProps {
  reviews: any;
  currentUser: any;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedReview: any) => void;
  onHelpful: (id: string) => void;
  editSuccess: any;
  deleting: any;
  deleteSuccess: any;
  likeLoading: any;
}

export function ReviewList({
  reviews,
  currentUser,
  onDelete,
  deleting,
  deleteSuccess,
  onEdit,
  onHelpful,
  likeLoading,
  editSuccess,
}: ReviewListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedReview, setEditedReview] = useState<any>({});
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [deleteDialog, setDeleteDialog] = useState(false);

  const handleEditClick = (review: any) => {
    setEditingId(review._id);
    setEditedReview({ rating: review.rating, comment: review.comment || "" });
  };

  useEffect(() => {
    if (editSuccess) {
      setEditingId(null);
      setEditedReview({});
    }
  }, [editSuccess]);

  useEffect(() => {
    if (deleteSuccess) {
      setDeleteDialog(false);
      setDeleteConfirmId(null);
    }
  }, [deleteSuccess]);

  const handleSaveEdit = (id: string) => {
    onEdit(id, editedReview);
  };

  const handleStarClick = (rating: number) => {
    setEditedReview((prev) => ({ ...prev, rating }));
  };

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="border border-gray-200 p-6 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div className="flex-grow space-y-2">
            <div className="flex items-center space-x-4">
                  <Avatar className="bg-slate-100 rounded-full">
                    <AvatarImage src={review.userId?.avatar?.url} alt={review.userId?.name} />
                    <AvatarFallback>{review.userId?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-800">{review.userId?.name}</h3>
                    <p className="text-sm text-gray-500">
                      {formatDistanceToNowStrict(new Date(review.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              <div className="flex mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      editingId === review._id ? "cursor-pointer" : ""
                    } ${
                      (editingId === review._id &&
                        star <= (editedReview.rating || 0)) ||
                      (editingId !== review._id && star <= review.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() =>
                      editingId === review._id && handleStarClick(star)
                    }
                  />
                ))}
              </div>
            </div>
            {currentUser._id === review.userId?._id && (
              <div className="flex space-x-2 ml-4">
                {editingId === review._id ? (
                  <>
                    <Button
                      onClick={() => handleSaveEdit(review._id)}
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        setEditingId(null);
                        setEditedReview({});
                      }}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <div className="relative group">
                    <button className="h-8 w-8 flex group-hover:bg-gray-300 rounded-full items-center justify-center text-gray-600 hover:text-gray-700 focus:outline-none">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                    <div className="absolute right-0 w-[5rem] bg-white rounded-md shadow-lg overflow-hidden z-10 invisible group-hover:visible">
                      <div className="py-1">
                        <button
                          onClick={() => handleEditClick(review)}
                          className="block w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setDeleteConfirmId(review._id);
                            setDeleteDialog(true);
                          }}
                          className="block w-full px-2 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="mt-3">
            {editingId === review._id ? (
              <Textarea
                value={editedReview.comment || ""}
                onChange={(e) =>
                  setEditedReview((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            ) : (
              review.comment && (
                <p className="text-gray-700">{review.comment}</p>
              )
            )}
          </div>
          <div className="mt-4 flex items-center space-x-4">
            {review.userId?._id?.toString() !== currentUser._id.toString() && (
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onHelpful(review._id)}
                  className="text-gray-500 flex gap-1 hover:bg-gray-100 border rounded-full px-5 py-[2px] "
                >
                  <span className={`${review.likes.includes(currentUser._id) ? 'text-teal-600' : 'text-gray-500'} flex items-center`}>
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    Helpful
                  </span>
                  ({review.likes.length})
                </Button>
              </motion.div>
            )}
          </div>
        
        </div>
      ))}
      <AlertDialog
        open={deleteDialog}
        onOpenChange={() => setDeleteDialog(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this review?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              review.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={() => {
                if (deleteConfirmId) {
                  onDelete(deleteConfirmId);
                }
              }}
            >
              {deleting ? "deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
