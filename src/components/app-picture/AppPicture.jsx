import React from 'react';
import PropTypes from 'prop-types';

export const getImgUrl = url => `${process.env.REACT_APP_DESTINATION_URL}${url}`;

const AppPicture = props => {
  if (!props.leadImage || (!props.leadImage.url && !props.leadImage.renditions)) {
    return null;
  }

  const src = getImgUrl(props.leadImage.url);
  let imgSourceList = null;

  if (props.leadImage.renditions) {
    imgSourceList = Object.values(props.leadImage.renditions)
      .sort((item1, item2) => item1.width - item2.width)
      .map((item) => (
        <source
          media={`(max-width: ${item.width}px)`}
          srcSet={getImgUrl(item.url)}
          key={item.url}
        ></source>
      ));
  }

  return (
    <picture>
      {imgSourceList}

      <img
        className={props.className}
        src={src}
        alt={props.altText}
      />
    </picture>
  );
};

AppPicture.propTypes = {
  className: PropTypes.string,
  altText: PropTypes.string,
  leadImage: PropTypes.shape({
    url: PropTypes.string,
    renditions: PropTypes.objectOf(
      PropTypes.shape({
        width: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
      }),
    ),
  }),
};

AppPicture.defaultProps = {
  altText: '',
};

export default AppPicture;
