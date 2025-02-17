import { useState } from 'react';

type Topic = {
  id: number;
  title: string;
  content: string;
};

type ListTopicsProps = {
  index: number;
  isClicked: number;
  setIsClicked: React.Dispatch<React.SetStateAction<number>>;
  data: Topic;
};

type TopicCardProps = {
  topics: Topic[];
};

const ListTopics: React.FC<ListTopicsProps> = ({
  index,
  isClicked,
  setIsClicked,
  data,
}) => {
  const onClickFn = (index: number) => {
    setIsClicked((preState) => {
      if (preState === index) {
        return -1;
      }
      return index;
    });
  };
  return (
    <div key={data.id}>
      <li
        key={data.id}
        onClick={() => {
          onClickFn(index);
        }}
        className="topics">
        {data.title}
      </li>
      <li
        key={data.id}
        onClick={() => {
          onClickFn(index);
        }}
        className={isClicked === index ? 'details' : 'details hidden'}>
        {data.content}
      </li>
    </div>
  );
};

const TopicCard: React.FC<TopicCardProps> = ({ topics }) => {
  const [isClicked, setIsClicked] = useState(-1);

  return (
    <div>
      {topics.map((topic, index) => {
        return (
          <ListTopics
            key={index}
            index={index}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
            data={topic}
          />
        );
      })}
    </div>
  );
};

export default TopicCard;
