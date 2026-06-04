-- Remove the implicit PUBLIC execute grant on has_role so it is only usable inside RLS
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;