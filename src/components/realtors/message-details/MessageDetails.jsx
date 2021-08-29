import React, { memo } from "react";
import PropTypes from "prop-types";
import "./MessageDetails.scss";

/**
 * Details of a message
 */
const MessageDetails = ({ isLoading, messageDetails, isSmallScreen, goBack }) =>
  (!isSmallScreen || messageDetails) && (
    <div className="message-details-wrapper">
      {isLoading ? (
        <CircularProgress />
      ) : messageDetails ? (
        <>
          <section className="message-details-contact">
            <header className="message-details-contact-header">
              <div
                className={`message-details-contact-icon ${
                  messageDetails.read ? "read" : "unread"
                }`}
              >
                <messageDetails.type.icon />
              </div>
              <h4 className="message-details-name">
                {messageDetails.contact.fullName}
              </h4>
            </header>
            <section className="message-details-contact-information">
              <div className="message-details-contact-attributes">
                <h5>Email</h5>
                <h5>Téléphone</h5>
              </div>
              <div className="message-details-contact-data">
                <a href={`mailto:${messageDetails.contact.email}`}>
                  {messageDetails.contact.email}
                </a>
                <a href={`tel:${messageDetails.contact.phone}`}>
                  {messageDetails.contact.spacedPhoneNumber}
                </a>
              </div>
            </section>
          </section>
          <section className="message-details-content">
            <div className="message-details-content-metadata">
              <h4 className="message-details-name">
                {messageDetails.contact.fullName}
              </h4>
              <h5 className="message-details-content-date">
                <time
                  dateTime={messageDetails.date}
                  className="message-details-content-date"
                >
                  {messageDetails.localeDate}
                </time>
              </h5>
            </div>

            <p className="message-details-content-body">
              {messageDetails.body}
            </p>
            {isSmallScreen && (
              <button className="return-button" onClick={goBack}>
                Retour
              </button>
            )}
          </section>
        </>
      ) : (
        <p>Sélectionnez un message</p>
      )}
    </div>
  );

MessageDetails.propTypes = {
  messageDetails: PropTypes.object,
};

export default memo(MessageDetails);
