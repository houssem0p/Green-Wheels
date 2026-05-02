CREATE POLICY "Users can update own payments to refunded"
ON public.payments
FOR UPDATE
TO public
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id AND status = 'refunded'::payment_status);