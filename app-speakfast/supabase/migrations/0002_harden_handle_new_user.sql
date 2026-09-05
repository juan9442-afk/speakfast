-- handle_new_user() solo corre como TRIGGER en auth.users, nunca como RPC.
-- Quitar EXECUTE al público cierra el endpoint /rest/v1/rpc/handle_new_user
-- (aviso de seguridad de Supabase: SECURITY DEFINER expuesto).
revoke execute on function public.handle_new_user() from anon, authenticated, public;
