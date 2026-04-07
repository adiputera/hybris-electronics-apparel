<%@ page trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="cms" uri="http://hybris.com/tld/cmstags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<cms:pageSlot position="${slotPosition}" var="feature"
              element="${fn:escapeXml(slotElement)}"
              class="${fn:escapeXml(slotClass)}">
    <cms:component component="${feature}"
                   element="${fn:escapeXml(componentElement)}"
                   class="${fn:escapeXml(componentClass)}"/>
</cms:pageSlot>
