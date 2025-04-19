"use client";

import { useEffect, useState } from "react";
import { ReviewSummary } from "./ReviewSummary";
import { ReviewList } from "./ReviewList";
import { AddReviewDialog } from "./AddReviewDialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  useAddReviewMutation,
  useDeleteReviewMutation,
  useEditReviewMutation,
  useGetAllReviewsForPharmacyQuery,
  useLikeReviewMutation,
} from "@/redux/features/pharmacy/pharmacyReviewApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useDeleteMedicineMutation } from "@/redux/features/medicine/medicineApi";
import { Skeleton } from "@/components/ui/skeleton";
import { ReviewSkeleton } from "./ReviewSkeleton/ReviewSkeleton";
import { Pagination } from "../../../../../../utils/CustomPagination";

interface Review {
  id: string;
  rating: number;
  comment?: string;
  author: string;
  date: string;
  helpful: number;
  helpfulUsers: string[];
}
type Props = {
  pharmacyId: string;
};

const ReviewSection = ({ pharmacyId }: Props) => {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isFetching, refetch } =
    useGetAllReviewsForPharmacyQuery(
      { page, pharmacyId },
      // { refetchOnMountOrArgChange: true }
    );

  const [
    addReview,
    {
      isSuccess,
      isLoading: addReviewLoading,
      error: addReviewError,
      data: addReviewRes,
    },
  ] = useAddReviewMutation();

  const [
    editReview,
    {
      isSuccess: editSuccess,
      isLoading: editLoading,
      error: editError,
      data: editRes,
    },
  ] = useEditReviewMutation();

  const [
    deleteReview,
    {
      isSuccess: deleteSuccess,
      isLoading: deleting,
      error: deleteError,
      data: deleteRes,
    },
  ] = useDeleteReviewMutation();

  const [
    likeReview,
    {
      isSuccess: likeSuccess,
      isLoading: likeLoading,
      error: likeError,
      data: likeRes,
    },
  ] = useLikeReviewMutation();

  const { user } = useSelector((state: any) => state.auth);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setReviews(data.reviews);
    }
  }, [data]);


  useEffect(() => {
    if (isSuccess) {
      toast.success(addReviewRes.message);
      refetch();
      setIsDialogOpen(false);
    }
    if (addReviewError) {
      if ("data" in addReviewError) {
        const errorData = addReviewError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [addReviewError, isSuccess]);

  useEffect(() => {
    if (editSuccess) {
      toast.success(editRes.message);
      // refetch();
    }
    if (editError) {
      if ("data" in editError) {
        const errorData = editError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [editSuccess, editError]);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success(deleteRes.message);
      refetch();
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorData = deleteError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [deleteSuccess, deleteError]);

  useEffect(() => {
    // if (likeSuccess) {
    //   toast.success(likeRes.message);
    //   refetch();
    // }
    if (likeError) {
      if ("data" in likeError) {
        const errorData = likeError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [likeSuccess, likeError]);

  const addReviewHandle = async ({ rating, comment }: any) => {
    await addReview({ pharmacyId, rating, comment });
  };

  const deleteReviewHandle = async (id: string) => {
    const reviewId = id;
    await deleteReview({ reviewId });
  };

  const editReviewHandle = async (
    id: string,
    updatedReview: Partial<Review>
  ) => {
    await editReview({
      reviewId: id,
      pharmacyId,
      page,
      rating: updatedReview.rating,
      comment: updatedReview.comment,
    });
  };
  const toggleHelpful = async (id: string) => {
    await likeReview({
       reviewId: id,
       pharmacyId,
       page,
      currentUser: user._id,
      });
  };

  return (
    <div className="max-w-4xl p-6 space-y-8 bg-white border mt-8 rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Reviews</h1>
      {isLoading || isFetching ? (
        <div>
          <div className="flex items-center space-x-6 bg-gray-50 p-6 rounded-lg">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <ReviewSkeleton />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          <p>Failed to load reviews. Please try again.</p>
          <Button
            onClick={() => refetch()}
            className="mt-4 bg-teal-600 hover:bg-teal-700 text-white"
          >
            Retry
          </Button>
        </div>
      ) : data?.reviews.length === 0 && data.totalPages === 0 ? (
        <div className="text-center text-gray-500">
          <p>No reviews yet. Be the first to add a review!</p>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="mt-4 bg-teal-600 hover:bg-teal-700 text-white"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Review
          </Button>
        </div>
      ) : (
        <>   
        <ReviewSummary
            avgRating={data?.averageRating}
            reviewCount={data?.numberOfReviews}
            ratingBreakdown={data?.ratingBreakdown}
          /> 
          
          {!data?.userHasReviewed && (
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="w-[12rem] bg-teal-600 hover:bg-teal-700 text-white"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Review
            </Button>
           ) }

       
     <ReviewList
        reviews={reviews}
        editSuccess={editSuccess}
        currentUser={user}
        onDelete={deleteReviewHandle}
        deleting={deleting}
        deleteSuccess={deleteSuccess}
        onEdit={editReviewHandle}
        onHelpful={toggleHelpful}
        likeLoading={likeLoading}
      />

        </>
      )}

    
      <AddReviewDialog
        user={user}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={addReviewHandle}
        addReviewLoading={addReviewLoading}
      />

      {!isLoading && data?.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default ReviewSection;
