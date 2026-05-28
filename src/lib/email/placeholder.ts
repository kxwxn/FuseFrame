export type TransactionalEmail = {
  to: string;
  subject: string;
  text: string;
};

export async function sendTransactionalEmail(email: TransactionalEmail): Promise<void> {
  console.info("FuseFrame email placeholder", {
    to: email.to,
    subject: email.subject,
  });
}
