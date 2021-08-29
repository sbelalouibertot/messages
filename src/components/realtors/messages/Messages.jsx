import React, { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import "./Messages.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";

/**
 * Messages
 * @param {Boolean} {isLoading} Loading boolean
 *
 */
const Messages = forwardRef(
  (
    { isLoading, messages, openMessageDetails, realtorId, selectedMessageRef },
    messagesListRef
  ) => (
    <nav className="messages-wrapper" ref={messagesListRef}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {messages ? (
            <ul>
              {messages.map(
                ({
                  id,
                  type,
                  contact,
                  relativeDate,
                  date,
                  subject,
                  shortBody,
                  read,
                  selected,
                }) => (
                  <li
                    className={`message-item ${read ? "read" : "unread"} ${
                      selected ? "selected" : ""
                    }`}
                    key={id}
                    onClick={() => openMessageDetails(id)}
                    ref={selected ? selectedMessageRef : null}
                  >
                    <Link to={`/realtors/${realtorId}/messages/${id}`}>
                      <>
                        <header className="message-item-header">
                          <div className="message-item-type">
                            <type.icon />
                          </div>
                          {contact.fullName && contact.spacedPhoneNumber ? (
                            <div className="message-item-contact">
                              <span className="message-item-contact-main">
                                {contact.fullName}
                              </span>
                              <span className="message-item-contact-secondary">
                                ({contact.spacedPhoneNumber})
                              </span>
                            </div>
                          ) : (
                            <div className="message-item-contact">
                              <p className="message-item-contact-main">
                                {contact.fullName ?? contact.spacedPhoneNumber}
                              </p>
                            </div>
                          )}
                          <time dateTime={date} className="message-item-date">
                            {relativeDate}
                          </time>
                        </header>
                        <section className="message-item-content">
                          <h5 className="message-item-subject">{subject}</h5>
                          <p className="message-item-body">{shortBody}</p>
                        </section>
                      </>
                    </Link>
                  </li>
                )
              )}
            </ul>
          ) : (
            <p>Aucun message</p>
          )}
        </>
      )}
    </nav>
  )
);

Messages.propTypes = {
  isLoading: PropTypes.bool,
};

export default memo(Messages);
