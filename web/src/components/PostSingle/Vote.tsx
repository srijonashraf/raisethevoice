import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import {
  BiDownArrow,
  BiSolidDownArrow,
  BiSolidUpArrow,
  BiUpArrow,
} from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { useSubmitVoteMutation } from 'store/api/feed';
import { requireAuth } from 'store/prompt';
import { PostT } from 'types/feed';
import { cn } from 'utils';

enum VoteType {
  UPVOTE = 1,
  DOWNVOTE = -1,
}

enum VoteActionType {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
}

const Vote = (props: PostT) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [downvoteCount, setDownvoteCount] = useState(0);
  const [submitVote] = useSubmitVoteMutation();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const submitDebouncedVote = useCallback(
    _.debounce((payload) => {
      submitVote(payload);
    }, 2000),
    []
  );

  useEffect(() => {
    setUpvoteCount(props.upvote_count);
    setDownvoteCount(props.downvote_count);
    setIsUpvoted(props.is_upvoted);
    setIsDownvoted(props.is_downvoted);
  }, [props]);

  const handleVote = (voteType: number) => {
    if (!user) {
      dispatch(requireAuth());
      return;
    }

    if (voteType === VoteType.UPVOTE) {
      if (isUpvoted) {
        handleUpvote(VoteActionType.DECREASE);
      } else if (isDownvoted) {
        handleUpvote(VoteActionType.INCREASE);
        handleDownvote(VoteActionType.DECREASE);
      } else {
        handleUpvote(VoteActionType.INCREASE);
      }
    } else if (voteType === VoteType.DOWNVOTE) {
      if (isUpvoted) {
        handleUpvote(VoteActionType.DECREASE);
        handleDownvote(VoteActionType.INCREASE);
      } else if (isDownvoted) {
        handleDownvote(VoteActionType.DECREASE);
      } else {
        handleDownvote(VoteActionType.INCREASE);
      }
    }

    submitDebouncedVote({ postId: props.id, voteType });
  };

  const handleUpvote = (actionType: VoteActionType) => {
    if (actionType === VoteActionType.INCREASE) {
      setIsUpvoted(true);
      setUpvoteCount(upvoteCount + 1);
    } else if (actionType === VoteActionType.DECREASE) {
      setIsUpvoted(false);
      setUpvoteCount(upvoteCount - 1);
    }
  };

  const handleDownvote = (actionType: VoteActionType) => {
    if (actionType === VoteActionType.INCREASE) {
      setIsDownvoted(true);
      setDownvoteCount(downvoteCount + 1);
    } else if (actionType === VoteActionType.DECREASE) {
      setIsDownvoted(false);
      setDownvoteCount(downvoteCount - 1);
    }
  };

  return (
    <div className="flex items-center justify-center h-8 bg-gray-100 rounded-full overflow-hidden">
      <button
        className={cn(
          'hover:bg-gray-200 cursor-pointer h-8 px-2.5 flex gap-1.5 items-center justify-center',
          {
            'bg-gray-800 hover:bg-gray-800 text-white': isUpvoted,
          }
        )}
        onClick={() => handleVote(1)}
      >
        {isUpvoted ? (
          <BiSolidUpArrow className="text-lg" />
        ) : (
          <BiUpArrow className="text-lg" />
        )}

        <p>{upvoteCount}</p>
      </button>
      <div className="w-[1px] h-full bg-gray-200" />
      <button
        className={cn(
          'hover:bg-gray-200 cursor-pointer h-8 px-2.5 flex gap-1.5 items-center justify-center',
          {
            'bg-gray-800 hover:bg-gray-800 text-white': isDownvoted,
          }
        )}
        onClick={() => handleVote(-1)}
      >
        {isDownvoted ? (
          <BiSolidDownArrow className="text-lg" />
        ) : (
          <BiDownArrow className="text-lg" />
        )}
        <p>{downvoteCount}</p>
      </button>
    </div>
  );
};

export default Vote;
