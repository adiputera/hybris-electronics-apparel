<%@ page trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="cms" uri="http://hybris.com/tld/cmstags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<cms:component uid="${componentUid}"
               element="${fn:escapeXml(componentElement)}"
               class="${fn:escapeXml(componentClass)}"/>
