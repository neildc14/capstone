import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function TermsAndConditionsModal({ isOpen, onClose }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Terms & Conditions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className=" overflow-scroll max-h-96">
              <section className="py-2">
                <p className="text-sm">
                  Please read these Terms and Conditions carefully before using
                  the [website URL] website (the "Service") operated by [your
                  company name] ("us", "we", or "our"). Your access to and use
                  of the Service is conditioned on your acceptance of and
                  compliance with these Terms. These Terms apply to all
                  visitors, users, and others who access or use the Service. By
                  accessing or using the Service you agree to be bound by these
                  Terms. If you disagree with any part of the terms then you may
                  not access the Service.
                </p>
              </section>
              <section className="py-2">
                <h2 className="text-lg font-semibold">Accounts</h2>
                <p className="text-sm">
                  When you create an account with us, you must provide us with
                  accurate, complete, and up-to-date information. Failure to do
                  so constitutes a breach of the Terms, which may result in
                  immediate termination of your account on our Service. You are
                  responsible for safeguarding the password that you use to
                  access the Service and for any activities or actions under
                  your password. We cannot and will not be liable for any loss
                  or damage arising from your failure to comply with this
                  security obligation.
                </p>
              </section>
              <section className="py-2">
                <h2 className="text-lg font-semibold">Intellectual Property</h2>
                <p className="text-sm">
                  {" "}
                  The Service and its original content, features, and
                  functionality are and will remain the exclusive property of
                  [your company name] and its licensors. The Service is
                  protected by copyright, trademark, and other laws of both the
                  United States and foreign countries. Our trademarks and trade
                  dress may not be used in connection with any product or
                  service without the prior written consent of [your company
                  name].
                </p>
              </section>
              <section className="py-2">
                <h2 className="text-lg font-semibold"> Changes</h2>
                <p className="text-sm">
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. If a revision is material we
                  will try to provide at least 30 days' notice prior to any new
                  terms taking effect. What constitutes a material change will
                  be determined at our sole discretion.
                </p>
              </section>
            </div>
          </ModalBody>

          <ModalFooter>
            <button
              className="px-4 py-2 rounded text-white bg-blue-600"
              onClick={onClose}
            >
              Agree
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TermsAndConditionsModal;
